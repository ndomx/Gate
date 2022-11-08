package com.ndomx.gate

import android.app.Activity
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.ImageView
import android.widget.Toast
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.ndomx.gate.auth.AuthListener
import com.ndomx.gate.auth.AuthManager
import com.ndomx.gate.http.GateClient

class MainActivity : AppCompatActivity(R.layout.activity_main), AuthListener {
    companion object {
        private const val LOG_TAG = "MainActivity"
    }

    private lateinit var resultLauncher: ActivityResultLauncher<Intent>
    private val authManager = AuthManager(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val button = findViewById<ImageView>(R.id.button_open_gate)
        button.setOnClickListener {
            requestAccess()
        }

        resultLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                onAuthSuccess()
            } else {
                onAuthFailure()
            }
        }
    }

    private fun requestAccess() {
        if (Build.VERSION.SDK_INT > 29) {
            Log.i(LOG_TAG, "Using BiometricPrompt API")
            authManager.showBiometricPrompt(this)
        } else {
            Log.i(LOG_TAG, "Using KeyGuardPrompt API")
            authManager.showKeyguardPrompt(this, resultLauncher)
        }
    }

    private fun onServerResponse(result: Boolean) = runOnUiThread {
        Toast.makeText(this, "Server says $result", Toast.LENGTH_SHORT).show()
    }

    override fun onAuthSuccess() {
        val client = GateClient.getInstance()
        client.requestAccess {
            onServerResponse(it)
        }
    }

    override fun onAuthFailure() = runOnUiThread {
        Toast.makeText(this, "Auth failed", Toast.LENGTH_SHORT).show()
    }
}