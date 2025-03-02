package com.ndomx.phonecontroller.interfaces

interface StateHandler {
    fun onSaveClick(phoneNumber: String)
    fun onConnectClick()
    fun onStartServiceClick()
}
