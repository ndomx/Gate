package com.ndomx.gate.http.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class GateRequest(
    @SerialName("device_id") val deviceId: String,
    @SerialName("user_id") val userId: String,
    val timestamp: Long
)
