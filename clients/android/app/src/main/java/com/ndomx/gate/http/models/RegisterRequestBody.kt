package com.ndomx.gate.http.models

import kotlinx.serialization.Serializable

@Serializable
data class RegisterRequestBody(
    val username: String,
    val password: String,
)
