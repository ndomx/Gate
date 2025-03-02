package com.ndomx.phonecontroller

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.ndomx.phonecontroller.api.Command
import com.ndomx.phonecontroller.mqtt.MessageSubscriber
import com.ndomx.phonecontroller.mqtt.MqttManager
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
                    phoneNumber = PreferenceManager.loadKey(
                        this,
                        getString(R.string.pref_phone_number_key)
                    ),
                    stateHandler = this,
                )
            }
        }
    }

    override fun onSaveClick(phoneNumber: String) {
        PreferenceManager.saveKey(
            this,
            getString(R.string.pref_phone_number_key),
            phoneNumber
        )
    }

    override fun onConnectClick() {
        MqttManager.addSubscriber(this)
        MqttManager.start(this)
    }

    override fun onCommand(command: Command) {
        val phoneNumber = PreferenceManager.loadKey(
            this,
            getString(R.string.pref_phone_number_key)
        )

        CallsService.makePhoneCall(this, phoneNumber)
    }
}