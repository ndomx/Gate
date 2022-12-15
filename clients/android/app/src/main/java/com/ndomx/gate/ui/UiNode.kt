package com.ndomx.gate.ui

import com.ndomx.gate.states.NodeState

data class UiNode(val id: String, val name: String, var state: NodeState)
