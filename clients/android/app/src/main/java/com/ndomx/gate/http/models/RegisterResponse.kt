package com.ndomx.gate.http.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class RegisterResponse(
    @SerialName("access_token")
    val accessToken: String
)
