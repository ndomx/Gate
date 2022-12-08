package com.ndomx.gate.http.models.common

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class User(
    @SerialName("userId")
    val id: String,
    val rootId: String,
    val name: String,
    val last: String,
    val username: String,
    val access: List<String>,
    val roles: List<String>
)
