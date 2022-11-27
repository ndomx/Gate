package com.ndomx.gate.http.models

import kotlinx.serialization.Serializable

@Serializable
data class GateResponse(
    val topic: String
)
