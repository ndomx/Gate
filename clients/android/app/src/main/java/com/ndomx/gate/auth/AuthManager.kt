package com.ndomx.gate.auth

import android.app.Activity
import android.app.KeyguardManager
import android.content.Context
import android.content.Intent
import android.os.Build
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

    private inner class CallbackManager() : BiometricPrompt.AuthenticationCallback() {
        override fun onAuthenticationFailed() {
            super.onAuthenticationFailed()

            Log.i(LOG_TAG, "Auth success")
            listener.onAuthFailure()
        }

        override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
            super.onAuthenticationError(errorCode, errString)

            Log.i(LOG_TAG, "Auth error")
            listener.onAuthFailure()
        }

        override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
            super.onAuthenticationSucceeded(result)

            Log.i(LOG_TAG, "Auth success")
            listener.onAuthSuccess()
        }
    }

    private val callbackManager = CallbackManager()

    fun showBiometricPrompt(activity: Activity) {
        val executor = ContextCompat.getMainExecutor(activity.baseContext)
        val biometricPrompt =
            BiometricPrompt(activity as FragmentActivity, executor, callbackManager)

        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Please verify")
            .setAllowedAuthenticators(BIOMETRIC_STRONG or DEVICE_CREDENTIAL)
            .build()

        biometricPrompt.authenticate(promptInfo)
    }

    fun showKeyguardPrompt(context: Context, launcher: ActivityResultLauncher<Intent>) {
        val keyguardManager = context.getSystemService(Context.KEYGUARD_SERVICE) as KeyguardManager
        val intent = keyguardManager.createConfirmDeviceCredentialIntent("Please verify", "")

        launcher.launch(intent)
    }
}