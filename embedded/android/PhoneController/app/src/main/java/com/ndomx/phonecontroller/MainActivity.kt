package com.ndomx.phonecontroller

import android.content.Intent
import android.os.Bundle
import android.telecom.TelecomManager
import android.util.Log
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
import com.ndomx.phonecontroller.ui.screens.HomeScreen
import com.ndomx.phonecontroller.ui.theme.PhoneControllerTheme

class MainActivity : ComponentActivity(), StateHandler, MessageSubscriber {
    override val subscriberId = "MainActivity"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            PhoneControllerTheme {
                HomeScreen(
                    phoneNumber = PreferenceController.loadString(
                        this,
                        getString(R.string.pref_phone_number_key)
                    ),
                    stateHandler = this,
                )
            }
        }

        requestDefaultDialer()
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

    override fun onServiceClick() {
        if (serviceStatus()) {
            stopMqttService()
        } else {
            startMqttService()
        }
    }

    override fun onCommand(command: Command) {
        val phoneNumber = PreferenceController.loadString(
            this,
            getString(R.string.pref_phone_number_key)
        )

        CallsController.makePhoneCall(this, phoneNumber)
    }

    override fun serviceStatus(): Boolean {
        return PreferenceController.loadBoolean(
            this,
            getString(R.string.pref_service_status_key)
        )
    }

    private fun startMqttService() {
        MqttManager.removeSubscriber(this)
        startService(
            Intent(this, MqttService::class.java)
        )
    }

    private fun stopMqttService() {
        stopService(
            Intent(this, MqttService::class.java)
        )
    }

    private fun requestDefaultDialer() {
        if (isDefaultDialer()) {
            Log.d("MainActivity", "App is already the default dialer")
            return
        }

        showDialerPrompt()
    }

    private fun isDefaultDialer(): Boolean {
        val telecomManager = getSystemService(TELECOM_SERVICE) as TelecomManager
        return telecomManager.defaultDialerPackage == packageName
    }

    private fun showDialerPrompt() {
        val intent = Intent(TelecomManager.ACTION_CHANGE_DEFAULT_DIALER).apply {
            putExtra(TelecomManager.EXTRA_CHANGE_DEFAULT_DIALER_PACKAGE_NAME, packageName)
        }

        startActivity(intent)
    }
}