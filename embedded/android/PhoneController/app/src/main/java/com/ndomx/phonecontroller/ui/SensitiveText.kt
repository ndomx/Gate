package com.ndomx.phonecontroller.ui

import androidx.compose.foundation.layout.Column
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.ThumbUp
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.tooling.preview.Preview

@Composable
fun SensitiveText(text: String, show: Boolean) {
    var isRevealed by remember { mutableStateOf(show) }

    if (isRevealed) {
        VisibleText(text) { isRevealed = false }
    } else {
        HiddenText(text) { isRevealed = true }
    }
}

@Composable()
@Preview(showBackground = true)
private fun SensitiveTextPreview() {
    Column {
        SensitiveText("example", true)
        SensitiveText("example", false)
    }
}

@Composable
private fun HiddenText(text: String, onClick: () -> Unit) {
    OutlinedTextField(
        value = text,
        onValueChange = {},
        visualTransformation = PasswordVisualTransformation(),
        trailingIcon = {
            IconButton(onClick = onClick) {
                Icon(Icons.Default.Visibility, contentDescription = "Toggle password visibility")
            }
        },
        enabled = false,
    )
}

@Composable
private fun VisibleText(text: String, onClick: () -> Unit) {
    OutlinedTextField(
        value = text,
        onValueChange = {},
        trailingIcon = {
            IconButton(onClick = onClick) {
                Icon(Icons.Default.VisibilityOff, contentDescription = "Toggle password visibility")
            }
        },
        enabled = false,
        singleLine = true,
    )
}