package com.ndomx.phonecontroller.ui.components

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

@Composable
fun ConnectionStatusIndicator(label: String, isConnected: Boolean) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.padding(vertical = 4.dp)
    ) {
        Text("$label: ", style = MaterialTheme.typography.bodyLarge)
        Box(
            modifier = Modifier
                .size(12.dp)
                .padding(start = 8.dp),
            contentAlignment = Alignment.Center
        ) {
            Surface(
                shape = MaterialTheme.shapes.small,
                color = if (isConnected) Color.Green else Color.Red,
                modifier = Modifier.size(12.dp)
            ) {}
        }
    }
}

@Composable
@Preview(showBackground = true)
private fun ConnectionStatusIndicatorPreview() {
    ConnectionStatusIndicator("Connection Status", true)
}