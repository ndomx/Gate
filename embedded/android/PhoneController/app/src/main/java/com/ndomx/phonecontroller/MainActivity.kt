package com.ndomx.phonecontroller

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.ndomx.phonecontroller.mqtt.MqttManager
import com.ndomx.phonecontroller.ui.HomeScreen
import com.ndomx.phonecontroller.ui.theme.PhoneControllerTheme

class MainActivity : ComponentActivity(), StateHandler {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            PhoneControllerTheme {
                HomeScreen(
                    phoneNumber = loadPhoneNumber(),
                    stateHandler = this,
                )
            }
        }
    }

    override fun onSaveClick(phoneNumber: String) {
        savePhoneNumber(phoneNumber)
    }

    override fun onConnectClick() {
        MqttManager.start(this)
    }

    private fun loadPhoneNumber(): String {
        val prefs = getPreferences(MODE_PRIVATE)
        return prefs.getString("phone_number", "") ?: ""
    }

    private fun savePhoneNumber(phoneNumber: String) {
        val prefs = getPreferences(MODE_PRIVATE)
        prefs.edit().putString("phone_number", phoneNumber).apply()
    }
}