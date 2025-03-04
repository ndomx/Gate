package com.ndomx.phonecontroller.controllers

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.telecom.TelecomManager
import android.telephony.PhoneStateListener
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.core.content.PermissionChecker

class CallsController(private val context: Context) : PhoneStateListener() {
    companion object {
        fun makePhoneCall(context: Context, phoneNumber: String) {
            if (phoneNumber.isBlank()) {
                showToast(context, "Phone number is empty!")
                return
            }

            if (!checkPermission(context)) {
                showToast(context, "Call permission required!")
                return
            }

            val intent = Intent(Intent.ACTION_CALL).apply {
                data = Uri.parse("tel:$phoneNumber")
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }

            context.startActivity(intent)
        }

        private fun checkPermission(context: Context): Boolean {
            val permission = android.Manifest.permission.CALL_PHONE
            val res = ContextCompat.checkSelfPermission(context, permission)
            return res == PermissionChecker.PERMISSION_GRANTED
        }

        private fun showToast(context: Context, message: String) {
            Handler(Looper.getMainLooper()).post {
                Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
            }
        }
    }
}