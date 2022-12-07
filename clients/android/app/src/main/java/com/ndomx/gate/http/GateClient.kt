package com.ndomx.gate.http

import com.ndomx.gate.http.models.AccessResponse
import com.ndomx.gate.http.models.RegisterRequestBody
import com.ndomx.gate.http.models.RegisterResponse
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlin.concurrent.thread

class GateClient private constructor() : HttpClient() {
    companion object {
        private const val LOG_TAG = "GateClient"

        private var INSTANCE: GateClient? = null
        fun getInstance(): GateClient {
            return INSTANCE ?: synchronized(this) {
                INSTANCE = GateClient()
                return INSTANCE!!
            }
        }
    }

    override val logTag = LOG_TAG

    fun requestAccess(
        host: String,
        path: String,
        token: String,
        deviceId: String,
        callback: (Boolean) -> Unit
    ) {
        thread {
            val response = fetch<AccessResponse>(
                serverUrl = "$host/${path.trim('/')}",
                request = HttpRequest(
                    method = HttpMethod.GET,
                    headers = mapOf(
                        "Authorization" to "Bearer $token"
                    ),
                    params = listOf(deviceId)
                )
            )

            callback(response != null)
        }
    }

    fun register(
        host: String,
        path: String,
        request: RegisterRequestBody,
        callback: (String?) -> Unit
    ) {
        val body = Json.encodeToString(request)

        thread {
            val response = fetch<RegisterResponse>(
                serverUrl = "$host/${path.trim('/')}",
                request = HttpRequest(
                    method = HttpMethod.POST,
                    headers = mapOf(
                        "Content-Type" to "application/json"
                    ),
                    body = body,
                )
            )

            callback(response?.token)
        }
    }
}