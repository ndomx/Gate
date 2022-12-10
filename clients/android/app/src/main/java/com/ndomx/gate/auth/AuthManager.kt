package com.ndomx.gate.auth

import android.app.Activity
import android.app.KeyguardManager
import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.activity.result.ActivityResultLauncher
import androidx.biometric.BiometricManager.Authenticators.BIOMETRIC_STRONG
import androidx.biometric.BiometricManager.Authenticators.DEVICE_CREDENTIAL
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity

class AuthManager(private val listener: AuthListener) {
    companion object {
        private const val LOG_TAG = "AuthManager.Callback"
    }

    private inner class CallbackManager(private val nodeId: String) :
        BiometricPrompt.AuthenticationCallback() {
        override fun onAuthenticationFailed() {
            super.onAuthenticationFailed()

            Log.i(LOG_TAG, "Auth success")
            listener.onAuthFailure(nodeId)
        }

        override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
            super.onAuthenticationError(errorCode, errString)

            Log.i(LOG_TAG, "Auth error")
            listener.onAuthFailure(nodeId)
        }

        override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
            super.onAuthenticationSucceeded(result)

            Log.i(LOG_TAG, "Auth success")
            listener.onAuthSuccess(nodeId)
        }
    }

    fun showBiometricPrompt(activity: Activity, nodeId: String) {
        val callbackManager = CallbackManager(nodeId)
        val executor = ContextCompat.getMainExecutor(activity.baseContext)
        val biometricPrompt =
            BiometricPrompt(activity as FragmentActivity, executor, callbackManager)

        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Please verify")
            .setAllowedAuthenticators(BIOMETRIC_STRONG or DEVICE_CREDENTIAL)
            .build()

        biometricPrompt.authenticate(promptInfo)
    }

    fun showKeyguardPrompt(
        context: Context,
        launcher: ActivityResultLauncher<Intent>,
        nodeId: String
    ) {
        val keyguardManager = context.getSystemService(Context.KEYGUARD_SERVICE) as KeyguardManager
        val intent = keyguardManager.createConfirmDeviceCredentialIntent("Please verify", "")
        intent.putExtra("nodeId", nodeId)

        launcher.launch(intent)
    }
}