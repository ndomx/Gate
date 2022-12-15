package com.ndomx.gate.http.models.common

import kotlinx.serialization.Serializable

@Serializable
data class NodeInfo(
    val isDevice: Boolean
)
