package com.ndomx.phonecontroller

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.ui.Modifier
import com.ndomx.phonecontroller.ui.HomeScreen
import com.ndomx.phonecontroller.ui.PhoneInput
import com.ndomx.phonecontroller.ui.theme.PhoneControllerTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            PhoneControllerTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    HomeScreen(
                        phoneNumber = loadPhoneNumber(),
                        onSave = { phoneNumber -> savePhoneNumber(phoneNumber) },
                        modifier = Modifier.padding(innerPadding),
                    )
                }
            }
        }
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