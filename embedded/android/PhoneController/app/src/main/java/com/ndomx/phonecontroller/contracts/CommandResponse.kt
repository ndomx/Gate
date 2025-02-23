package com.ndomx.phonecontroller.contracts

import kotlinx.serialization.Serializable

@Serializable
data class CommandResponse(
    val deviceId: String,
    val status: Int
)
