package com.ndomx.phonecontroller.ui

import android.widget.Toast
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ContentCopy
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonColors
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Snackbar
import androidx.compose.material3.SnackbarData
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

    val clipboardManager = LocalClipboardManager.current

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

            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth(0.8f)
            ) {
                SensitiveText(BuildConfig.DEVICE_ID, true)
                Button(onClick = {
                    clipboardManager.setText(AnnotatedString(BuildConfig.DEVICE_ID))
                    scope.launch {
                        snackbarHostState.showSnackbar("Device ID copied to clipboard")
                    }
                }, colors = ButtonDefaults.outlinedButtonColors()) {
                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("Copy to clipboard")
                        Icon(Icons.Default.ContentCopy, contentDescription = "Copy to clipboard")
                    }
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
        })
    }
}