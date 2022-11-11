package com.ndomx.gate

import android.app.Activity
import android.content.Context
import android.content.Intent
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
import com.ndomx.gate.machine.GateState
import com.ndomx.gate.machine.GateStateData
import com.ndomx.gate.machine.GateStateListener
import com.ndomx.gate.machine.GateStateMachine

class MainActivity : AppCompatActivity(R.layout.activity_main), AuthListener, GateStateListener {
    companion object {
        private const val LOG_TAG = "MainActivity"
        private const val BACKGROUND_INDEX = 0
        private const val LOCK_INDEX = 1
    }

    private lateinit var resultLauncher: ActivityResultLauncher<Intent>
    private val authManager = AuthManager(this)
    private val gateStateMachine by lazy { GateStateMachine(this) }

    private lateinit var icon: LayerDrawable
    private val iconBackground by lazy { icon.getDrawable(BACKGROUND_INDEX) }
    private val lockIcon by lazy { icon.getDrawable(LOCK_INDEX) as LevelListDrawable }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val button = findViewById<ImageView>(R.id.button_open_gate)
        button.setOnClickListener {
            if (gateStateMachine.isIdle) {
                requestAccess()
            }
        }

        icon = button.drawable as LayerDrawable

        resultLauncher =
            registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
                if (result.resultCode == Activity.RESULT_OK) {
                    onAuthSuccess()
                } else {
                    onAuthFailure()
                }
            }
    }

    override fun onStart() {
        super.onStart()

        gateStateMachine.setState(GateState.IDLE)
    }

    override fun onAuthSuccess() {
        val client = GateClient.getInstance()
        client.requestAccess {
            onServerResponse(it)
        }
    }

    override fun onAuthFailure() = runOnUiThread {
        Toast.makeText(this, "Auth failed", Toast.LENGTH_SHORT).show()
        runOnUiThread {
            gateStateMachine.setState(GateState.FAILURE)
        }
    }

    override fun getContext(): Context {
        return this
    }

    override fun onState(gateStateData: GateStateData) = runOnUiThread {
        iconBackground.setTint(gateStateData.background)
        lockIcon.level = gateStateData.foregroundLevel
    }

    private fun requestAccess() {
        runOnUiThread {
            gateStateMachine.setState(GateState.WAITING)
        }

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
        runOnUiThread {
            gateStateMachine.setState(
                when (result) {
                    true -> GateState.SUCCESS
                    false -> GateState.FAILURE
                }
            )
        }
    }
}