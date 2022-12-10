package com.ndomx.gate.auth

interface AuthListener {
    fun onAuthSuccess(nodeId: String)
    fun onAuthFailure(nodeId: String)
}