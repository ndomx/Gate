package com.ndomx.phonecontroller.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ContentCopy
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.ndomx.phonecontroller.BuildConfig

@Composable
fun DeviceIdView(
    displayMessage: (message: String) -> Unit,
) {
    val clipboardManager = LocalClipboardManager.current

    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(8.dp),
        modifier = Modifier.fillMaxWidth(0.8f)
    ) {
        SensitiveText(BuildConfig.DEVICE_ID, true)
        Button(onClick = {
            clipboardManager.setText(AnnotatedString(BuildConfig.DEVICE_ID))
            displayMessage("Device ID copied to clipboard")
        }, colors = ButtonDefaults.outlinedButtonColors()) {
            Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                Text("Copy to clipboard")
                Icon(Icons.Default.ContentCopy, contentDescription = "Copy to clipboard")
            }
        }
    }
}

@Composable
@Preview(showBackground = true)
private fun DeviceIdViewPreview() {
    DeviceIdView {}
}