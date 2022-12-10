package com.ndomx.gate.auth

import android.app.Activity
import android.app.KeyguardManager
import android.content.Context
import android.os.Build
import android.util.Log
import androidx.biometric.BiometricManager.Authenticators.*
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

    /**
     * todo: if device is not secured, an internal auth should be required
     */
    fun showBiometricPrompt(activity: Activity, nodeId: String) {
        val keyguardManager = activity.getSystemService(Context.KEYGUARD_SERVICE) as KeyguardManager
        if (!keyguardManager.isKeyguardSecure) {
            listener.onAuthSuccess(nodeId)
            return
        }

        val callbackManager = CallbackManager(nodeId)
        val executor = ContextCompat.getMainExecutor(activity.baseContext)
        val biometricPrompt =
            BiometricPrompt(activity as FragmentActivity, executor, callbackManager)

        val promptInfoBuilder = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Please verify")

        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.Q) {
            promptInfoBuilder.setAllowedAuthenticators(BIOMETRIC_WEAK or DEVICE_CREDENTIAL)
        } else {
            promptInfoBuilder.setAllowedAuthenticators(BIOMETRIC_STRONG or DEVICE_CREDENTIAL)
        }

        val promptInfo = promptInfoBuilder.build()
        biometricPrompt.authenticate(promptInfo)
    }
}