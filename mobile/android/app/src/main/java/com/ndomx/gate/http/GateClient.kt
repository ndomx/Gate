package com.ndomx.gate.http

import android.content.Context
import com.ndomx.gate.http.models.GateRequest

class GateClient private constructor(context: Context) {
    companion object {
        private var INSTANCE: GateClient? = null

        fun getInstance(context: Context): GateClient {
            return INSTANCE ?: synchronized(this) {
                INSTANCE = GateClient(context)
                return INSTANCE!!
            }
        }
    }

    suspend fun requestAccess(gateRequest: GateRequest): Boolean {
        TODO("Not implemented yet")
    }
}