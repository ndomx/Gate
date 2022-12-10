package com.ndomx.gate.http

import com.ndomx.gate.http.models.request.RegisterRequestBody
import com.ndomx.gate.http.models.response.AccessResponse
import com.ndomx.gate.http.models.response.RegisterResponse
import com.ndomx.gate.http.models.response.UserNodesResponse
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
        token: String,
        deviceId: String,
        callback: (AccessResponse?) -> Unit
    ) = thread {
        val response = fetch<AccessResponse>(
            serverUrl = buildUrl(host, "/gates/activate"),
            request = HttpRequest(
                method = HttpMethod.GET,
                headers = mapOf(
                    "Authorization" to "Bearer $token"
                ),
                params = listOf(deviceId)
            )
        )

        callback(response)
    }

    fun register(
        host: String,
        request: RegisterRequestBody,
        callback: (String?) -> Unit
    ) = thread {
        val body = Json.encodeToString(request)


        val response = fetch<RegisterResponse>(
            serverUrl = buildUrl(host, "/auth"),
            request = HttpRequest(
                method = HttpMethod.POST,
                headers = mapOf(
                    "Content-Type" to "application/json"
                ),
                body = body,
            )
        )

        callback(response?.accessToken)
    }

    fun fetchUserNodes(
        host: String,
        token: String,
        callback: (UserNodesResponse?) -> Unit
    ) = thread {
        val response = fetch<UserNodesResponse>(
            serverUrl = buildUrl(host, "/nodes-client/user"),
            request = HttpRequest(
                method = HttpMethod.GET,
                headers = mapOf(
                    "Authorization" to "Bearer $token"
                ),
                query = mapOf(
                    "device_only" to "true"
                )
            )
        )

        callback(response)
    }

    private fun buildUrl(host: String, path: String): String {
        return "https://$host/${path.trim('/')}"
    }
}