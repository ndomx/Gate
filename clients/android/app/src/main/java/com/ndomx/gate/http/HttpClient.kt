package com.ndomx.gate.http

import android.util.Log
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json
import java.io.BufferedOutputStream
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.URL
import javax.net.ssl.HttpsURLConnection

abstract class HttpClient {
    companion object {
        protected val SUPPORTED_CODES = arrayOf(
            HttpsURLConnection.HTTP_OK, HttpsURLConnection.HTTP_CREATED
        )
    }

    protected abstract val logTag: String

    protected inline fun <reified T> fetch(serverUrl: String, request: HttpRequest): T? {
        val builder = StringBuilder(serverUrl).apply {
            trimEnd('/')
        }

        request.params?.forEach { param ->
            builder.append("/$param")
        }

        request.query?.let { query ->
            builder.append("?")
            query.forEach { entry -> builder.append("${entry.key}=${entry.value}&") }
            builder.trimEnd('&')
        }

        val url = URL(builder.toString())

        var response: T? = null
        var client: HttpsURLConnection? = null

        try {
            client = (url.openConnection() as HttpsURLConnection).apply {
                doOutput = true
                requestMethod = request.method.name
                setChunkedStreamingMode(0)
                request.headers?.forEach { entry -> setRequestProperty(entry.key, entry.value) }
            }

            request.body?.let { body -> sendRequest(client, body) }
            response = getResponse<T>(client)
        } catch (e: Exception) {
            Log.e(logTag, e.message ?: "Unknown error while sending request")
        } finally {
            client?.disconnect()
        }

        return response
    }

    protected fun sendRequest(client: HttpsURLConnection, body: String) {
        val outputStream = BufferedOutputStream(client.outputStream)
        val writer = OutputStreamWriter(outputStream)

        writer.write(body)
        writer.flush()
        writer.close()
    }

    protected inline fun <reified T> getResponse(client: HttpsURLConnection): T? {
        val responseCode = client.responseCode
        if (responseCode !in SUPPORTED_CODES) {
            Log.e(logTag, "Received code $responseCode")
            return null
        }

        val inputStream = InputStreamReader(client.inputStream)
        val reader = BufferedReader(inputStream)

        val response = reader.readLines().joinToString("")
        return try {
            val builder = Json { ignoreUnknownKeys = true }
            builder.decodeFromString(response)
        } catch (e: Exception) {
            Log.e(logTag, e.message ?: "Cannot decode $response")
            null
        }
    }
}