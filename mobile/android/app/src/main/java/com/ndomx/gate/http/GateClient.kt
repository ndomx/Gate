package com.ndomx.gate.http

import android.content.Context
import android.util.Log
import com.ndomx.gate.BuildConfig
import com.ndomx.gate.http.models.GateRequest
import com.ndomx.gate.http.models.GateResponse
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.io.BufferedOutputStream
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.URL
import java.util.*
import javax.net.ssl.HttpsURLConnection
import kotlin.concurrent.thread

class GateClient private constructor() {
    companion object {
        const val LOG_TAG = "GateClient"

        private const val OPERATION_SUCCESS = "access-granted"
        private val SUPPORTED_CODES =
            arrayOf(HttpsURLConnection.HTTP_OK, HttpsURLConnection.HTTP_CREATED)

        private var INSTANCE: GateClient? = null
        fun getInstance(): GateClient {
            return INSTANCE ?: synchronized(this) {
                INSTANCE = GateClient()
                return INSTANCE!!
            }
        }
    }

    fun requestAccess(callback: (Boolean) -> Unit) {
        val request = GateRequest(
            deviceKey = BuildConfig.DEVICE_KEY,
            gateId = BuildConfig.GATE_ID,
            timestamp = Date().time,
        )

        val body = Json.encodeToString(request)
        Log.d(LOG_TAG, body)

        var success = false
        var response: GateResponse? = null
        thread {
            val url = URL(BuildConfig.SERVER_URL)
            var client: HttpsURLConnection? = null

            try {
                client = (url.openConnection() as HttpsURLConnection).apply {
                    doOutput = true
                    requestMethod = "POST"
                    setChunkedStreamingMode(0)
                    setRequestProperty("Content-Type", "application/json")
                }

                sendPostRequest(client, body)
                response = getResponse(client)
            } catch (e: Exception) {
                Log.e(LOG_TAG, e.message ?: "Unknown error while sending request")
            } finally {
                client?.disconnect()
            }

            response?.let { res ->
                if (res.result == OPERATION_SUCCESS) {
                    success = true
                }
            }

            callback(success)
        }
    }

    private fun sendPostRequest(client: HttpsURLConnection, body: String) {
        val outputStream = BufferedOutputStream(client.outputStream)
        val writer = OutputStreamWriter(outputStream)

        writer.write(body)
        writer.flush()
        writer.close()
    }

    private fun getResponse(client: HttpsURLConnection): GateResponse? {
        val responseCode = client.responseCode
        if (responseCode !in SUPPORTED_CODES) {
            Log.e(LOG_TAG, "Received code $responseCode")
            return null
        }

        val inputStream = InputStreamReader(client.inputStream)
        val reader = BufferedReader(inputStream)

        val response = reader.readLines().joinToString("")
        return try {
            Json.decodeFromString(response)
        } catch (e: Exception) {
            null
        }
    }
}