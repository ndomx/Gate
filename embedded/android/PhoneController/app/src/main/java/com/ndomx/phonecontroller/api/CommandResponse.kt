package com.ndomx.phonecontroller.api

import kotlinx.serialization.Serializable

@Serializable
data class CommandResponse(
    val deviceId: String,
    val status: Int
)
