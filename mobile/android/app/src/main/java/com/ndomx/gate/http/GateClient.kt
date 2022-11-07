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
import java.net.HttpURLConnection
import java.net.URL
import java.util.*
import kotlin.concurrent.thread

class GateClient private constructor(context: Context) {
    companion object {
        const val LOG_TAG = "GateClient"

        private const val OPERATION_SUCCESS = "access-granted"

        private var INSTANCE: GateClient? = null
        fun getInstance(context: Context): GateClient {
            return INSTANCE ?: synchronized(this) {
                INSTANCE = GateClient(context)
                return INSTANCE!!
            }
        }
    }

    fun requestAccess(callback: (Boolean) -> Unit) {
        val request = GateRequest(
            deviceKey = BuildConfig.DEVICE_KEY,
            gateId = BuildConfig.GATE_ID,
            timestamp = Date().time
        )

        var success = false
        var response: GateResponse? = null
        thread {
            val url = URL(BuildConfig.SERVER_URL)
            var client: HttpURLConnection? = null

            try {
                client = (url.openConnection() as HttpURLConnection).apply {
                    doOutput = true
                    requestMethod = "POST"
                    setChunkedStreamingMode(0)
                }

                val body = Json.encodeToString(request)

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

    private fun sendPostRequest(client: HttpURLConnection, body: String) {
        val outputStream = BufferedOutputStream(client.outputStream)
        val writer = OutputStreamWriter(outputStream)

        writer.write(body)
        writer.flush()
        writer.close()
    }

    private fun getResponse(client: HttpURLConnection): GateResponse? {
        val responseCode = client.responseCode
        if (responseCode != HttpURLConnection.HTTP_OK) {
            return null
        }

        val inputStream = InputStreamReader(client.inputStream)
        val reader = BufferedReader(inputStream)

        val response = reader.readLines().joinToString("")
        Log.d(LOG_TAG, response)
        return try {
            Json.decodeFromString(response)
        } catch (e: Exception) {
            null
        }
    }
}