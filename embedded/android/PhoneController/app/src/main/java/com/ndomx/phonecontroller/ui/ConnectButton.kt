package com.ndomx.phonecontroller.ui

import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.ndomx.phonecontroller.mqtt.ConnectionStatus

private data class ButtonStatus(
    val enabled: Boolean,
    val text: String,
    val showProgressIndicator: Boolean = false,
)

@Composable
fun ConnectButton(status: ConnectionStatus, onClick: () -> Unit) {
    val buttonStatusMap = mapOf(
        ConnectionStatus.CONNECTING to ButtonStatus(
            false, "Connecting...", true
        ),
        ConnectionStatus.CONNECTED to ButtonStatus(true, "Connected"),
        ConnectionStatus.DISCONNECTED to ButtonStatus(true, "Connect"),
        ConnectionStatus.ERROR to ButtonStatus(true, "Error"),
        ConnectionStatus.DISCONNECTING to ButtonStatus(
            false, "Disconnecting...", true
        )
    )

    val buttonStatus = buttonStatusMap[status]

    Button(
        onClick = onClick,
        enabled = buttonStatus!!.enabled,
        modifier = Modifier.fillMaxWidth(),
    ) {
        Text(buttonStatus.text)

        if (buttonStatus.showProgressIndicator) {
            Spacer(Modifier.size(ButtonDefaults.IconSpacing))

            CircularProgressIndicator(
                modifier = Modifier.size(20.dp),
                color = MaterialTheme.colorScheme.onPrimary,
                strokeWidth = 2.dp
            )
        }
    }
}

@Composable
@Preview(showBackground = true)
private fun ConnectButtonPreview() {
    ConnectButton(ConnectionStatus.CONNECTING) {}
}