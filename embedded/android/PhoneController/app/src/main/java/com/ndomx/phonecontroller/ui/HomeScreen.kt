package com.ndomx.phonecontroller.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.ndomx.phonecontroller.StateHandler
import com.ndomx.phonecontroller.ui.theme.PhoneControllerTheme

@Composable
fun HomeScreen(
    phoneNumber: String,
    stateHandler: StateHandler,
    modifier: Modifier = Modifier
) {
    Column(
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = modifier.fillMaxSize()
    ) {
        PhoneInput(phoneNumber, stateHandler::onSaveClick)
        Button(onClick = stateHandler::onConnectClick) {
            Text("Connect")
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