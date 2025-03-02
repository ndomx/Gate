package com.ndomx.phonecontroller.ui

import android.bluetooth.BluetoothClass.Device
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ContentCopy
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.ndomx.phonecontroller.BuildConfig
import com.ndomx.phonecontroller.StateHandler
import com.ndomx.phonecontroller.mqtt.ConnectionStatus
import com.ndomx.phonecontroller.mqtt.MqttManager
import com.ndomx.phonecontroller.ui.theme.PhoneControllerTheme
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    phoneNumber: String,
    stateHandler: StateHandler
) {
    val mqttStatus by MqttManager.status.collectAsState()
    val mqttSending by MqttManager.sending.collectAsState()

    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        snackbarHost = {
            SnackbarHost(snackbarHostState)
        },
        topBar = {
            TopAppBar(
                title = { Text("Phone Controller") },
            )
        },
    ) { innerPadding ->
        Column(
            verticalArrangement = Arrangement.SpaceBetween,
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .padding(innerPadding)
                .padding(16.dp)
                .fillMaxSize()
        ) {
            Column {
                ConnectionStatusIndicator(
                    "Internet",
                    mqttStatus == ConnectionStatus.CONNECTED
                )

                ConnectionStatusIndicator(
                    "MQTT Broker",
                    mqttStatus == ConnectionStatus.CONNECTED
                )
            }

            PhoneInput(phoneNumber, onSave = {})

            DeviceIdView {
                scope.launch {
                    snackbarHostState.showSnackbar("Device ID copied to clipboard")
                }
            }

            ConnectButton(mqttStatus, stateHandler::onConnectClick)
        }
    }
}

@Composable
@Preview(showBackground = true)
private fun HomeScreenPreview() {
    PhoneControllerTheme {
        HomeScreen("+56912345678", object : StateHandler {
            override fun onSaveClick(phoneNumber: String) {}
            override fun onConnectClick() {}
            override fun onStartServiceClick() {}
        })
    }
}