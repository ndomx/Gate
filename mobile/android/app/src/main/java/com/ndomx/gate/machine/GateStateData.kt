package com.ndomx.gate.machine

import androidx.annotation.ColorInt
import com.ndomx.gate.machine.GateStateMachine

data class GateStateData(
    @ColorInt
    val background: Int,
    val foregroundLevel: Int,
    val state: GateState
)
