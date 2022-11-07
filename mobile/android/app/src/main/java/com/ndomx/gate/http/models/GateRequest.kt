package com.ndomx.gate.http.models

data class GateRequest(
    val deviceKey: String,
    val gateId: String,
    val timestamp: Long
)
