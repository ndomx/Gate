package com.ndomx.phonecontroller.contracts

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement

@Serializable
data class Command(
    val action: String,
    val actionDetails: Map<String, JsonElement>? = null
)
