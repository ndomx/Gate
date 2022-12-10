package com.ndomx.gate.http.models.response

import com.ndomx.gate.http.models.common.Node
import kotlinx.serialization.Serializable

@Serializable
data class AccessResponse(
    val node: Node,
    val topic: String,
    val success: Boolean
)
