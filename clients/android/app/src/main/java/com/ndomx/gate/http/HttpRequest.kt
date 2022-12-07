package com.ndomx.gate.http

data class HttpRequest(
    val method: HttpMethod,
    val headers: Map<String, String>? = null,
    val params: List<String>? = null,
    val query: Map<String, Any>? = null,
    val body: String? = null,
)
