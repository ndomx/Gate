package com.ndomx.gate.http.models

import kotlinx.serialization.Serializable

@Serializable
data class GateRequest(
    val deviceKey: String,
    val gateId: String,
    val timestamp: Long
)
