package com.ndomx.phonecontroller

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.ndomx.phonecontroller.api.Command
import com.ndomx.phonecontroller.controllers.CallsController
import com.ndomx.phonecontroller.controllers.PreferenceController
import com.ndomx.phonecontroller.interfaces.StateHandler
import com.ndomx.phonecontroller.mqtt.MessageSubscriber
import com.ndomx.phonecontroller.mqtt.MqttManager
import com.ndomx.phonecontroller.services.MqttService
import com.ndomx.phonecontroller.ui.HomeScreen
import com.ndomx.phonecontroller.ui.theme.PhoneControllerTheme

class MainActivity : ComponentActivity(), StateHandler, MessageSubscriber {
    override val subscriberId = "MainActivity"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            PhoneControllerTheme {
                HomeScreen(
                    phoneNumber = PreferenceController.loadKey(
                        this,
                        getString(R.string.pref_phone_number_key)
                    ),
                    stateHandler = this,
                )
            }
        }
    }

    override fun onSaveClick(phoneNumber: String) {
        PreferenceController.saveKey(
            this,
            getString(R.string.pref_phone_number_key),
            phoneNumber
        )
    }

    override fun onConnectClick() {
        MqttManager.addSubscriber(this)
        MqttManager.start(this)
    }

    override fun onStartServiceClick() {
        MqttManager.removeSubscriber(this)
        startService(
            Intent(this, MqttService::class.java)
        )
    }

    override fun onCommand(command: Command) {
        val phoneNumber = PreferenceController.loadKey(
            this,
            getString(R.string.pref_phone_number_key)
        )

        CallsController.makePhoneCall(this, phoneNumber)
    }
}