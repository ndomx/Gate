package com.ndomx.gate.http.models

import kotlinx.serialization.Serializable

@Serializable
data class GateResponse(
    val errorCode: Int? = null,
    val message: String? = null,
    val topic: String? = null,
    val success: Boolean
)
