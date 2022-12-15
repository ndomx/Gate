package com.ndomx.gate.http.models.response

import com.ndomx.gate.http.models.common.Node
import com.ndomx.gate.http.models.common.User
import kotlinx.serialization.Serializable

@Serializable
data class UserNodesResponse(
    val user: User,
    val nodes: List<Node>
)