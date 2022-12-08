package com.ndomx.gate.http.models.response

import kotlinx.serialization.Serializable

@Serializable
data class AccessResponse(
    val topic: String
)
