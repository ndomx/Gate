package com.ndomx.gate.http.models

import kotlinx.serialization.Serializable

@Serializable
data class LoginResponse(
    val token: String
)
