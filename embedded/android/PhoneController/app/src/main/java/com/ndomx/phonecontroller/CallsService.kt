package com.ndomx.phonecontroller

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.core.content.PermissionChecker

object CallsService {
    fun makePhoneCall(context: Context, phoneNumber: String) {
        if (phoneNumber.isBlank()) {
            Toast.makeText(context, "Phone number is empty!", Toast.LENGTH_SHORT).show()
            return
        }

        if (!checkPermission(context)) {
            Toast.makeText(context, "Call permission required!", Toast.LENGTH_LONG).show()
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
}