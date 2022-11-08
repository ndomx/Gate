package com.ndomx.gate

import android.app.Activity
import android.content.Intent
import android.graphics.Color
import android.graphics.drawable.LayerDrawable
import android.graphics.drawable.LevelListDrawable
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

        resultLauncher =
            registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
                if (result.resultCode == Activity.RESULT_OK) {
                    onAuthSuccess()
                } else {
                    onAuthFailure()
                }
            }
    }

    override fun onAuthSuccess() {
        val client = GateClient.getInstance()
        client.requestAccess {
            onServerResponse(it)
        }
    }

    override fun onAuthFailure() = runOnUiThread {
        Toast.makeText(this, "Auth failed", Toast.LENGTH_SHORT).show()
        setIconToIdle()
    }

    private fun requestAccess() {
        setIconToWaiting()

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
        if (result) {
            setIconToSuccess()
        }
    }

    private fun setIconToWaiting() {
        val button = findViewById<ImageView>(R.id.button_open_gate)
        val layerList = button.drawable as LayerDrawable
        layerList.getDrawable(0).setTint(Color.BLUE)

        val levelList = layerList.getDrawable(1) as LevelListDrawable
        levelList.level = 0
    }

    private fun setIconToIdle() {
        val button = findViewById<ImageView>(R.id.button_open_gate)
        val layerList = button.drawable as LayerDrawable
        layerList.getDrawable(0).setTint(Color.RED)

        val levelList = layerList.getDrawable(1) as LevelListDrawable
        levelList.level = 0
    }

    private fun setIconToSuccess() {
        val button = findViewById<ImageView>(R.id.button_open_gate)
        val layerList = button.drawable as LayerDrawable
        layerList.getDrawable(0).setTint(Color.GREEN)

        val levelList = layerList.getDrawable(1) as LevelListDrawable
        levelList.level = 1
    }
}