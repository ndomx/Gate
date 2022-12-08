package com.ndomx.gate.http.models.common

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class Node(
    @SerialName("nodeId") val id: String,
    val rootId: String,
    @SerialName("parent") val parentId: String,
    val name: String,
    val nodeInfo: NodeInfo,
)
