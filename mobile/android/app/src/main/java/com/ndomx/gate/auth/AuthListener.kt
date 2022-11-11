package com.ndomx.gate.auth

interface AuthListener {
    fun onAuthSuccess()
    fun onAuthFailure()
}