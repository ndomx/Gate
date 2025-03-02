package com.ndomx.phonecontroller.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.ndomx.phonecontroller.interfaces.StateHandler
import com.ndomx.phonecontroller.mqtt.MqttManager

@Composable
fun BottomPanel(stateHandler: StateHandler) {
    val mqttStatus by MqttManager.status.collectAsState()

    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
        ConnectButton(mqttStatus, Modifier.fillMaxWidth(0.5f), stateHandler::onConnectClick)
        Button(
            stateHandler::onStartServiceClick,
            shape = MaterialTheme.shapes.small,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(if (stateHandler.serviceStatus()) {
                "Stop Service"
            } else {
                "Start Service"
            })
        }
    }
}

@Composable
@Preview(showBackground = true)
private fun BottomPanelPreview() {
    BottomPanel(object : StateHandler {
        override fun onSaveClick(phoneNumber: String) {}
        override fun onConnectClick() {}
        override fun onStartServiceClick() {}
        override fun serviceStatus(): Boolean = true
    })
}