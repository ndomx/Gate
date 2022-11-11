package com.ndomx.gate.machine

import android.content.Context

interface GateStateListener {
    fun getContext(): Context
    fun onState(gateStateData: GateStateData)
}