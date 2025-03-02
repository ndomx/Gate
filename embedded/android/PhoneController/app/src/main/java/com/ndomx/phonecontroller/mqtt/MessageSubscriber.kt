package com.ndomx.phonecontroller.mqtt

import com.ndomx.phonecontroller.api.Command

interface MessageSubscriber {
    val subscriberId: String
    fun onCommand(command: Command)
}