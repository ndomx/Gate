package com.ndomx.phonecontroller.services

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log
import androidx.core.app.NotificationCompat
import com.ndomx.phonecontroller.controllers.PreferenceController
import com.ndomx.phonecontroller.R
import com.ndomx.phonecontroller.api.Command
import com.ndomx.phonecontroller.controllers.CallsController
import com.ndomx.phonecontroller.mqtt.MessageSubscriber
import com.ndomx.phonecontroller.mqtt.MqttManager

class MqttService : Service(), MessageSubscriber {
    companion object {
        private const val CHANNEL_ID = "MqttServiceChannel"
        private const val LOG_TAG = "MqttService"
    }

    override val subscriberId = "MqttService"
    private var loadedPhoneNumber: String? = null

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        startForeground(1, createNotification())

        Log.i(LOG_TAG, "MQTT Service Started")

        MqttManager.addSubscriber(this)
        MqttManager.start(this)
    }

    override fun onDestroy() {
        super.onDestroy()

        MqttManager.disconnect()
        MqttManager.removeSubscriber(this)

        Log.i(LOG_TAG, "MQTT Service Stopped")
    }

    override fun onCommand(command: Command) {
        val phoneNumber = loadPhoneNumber()
        CallsController.makePhoneCall(this, phoneNumber)
    }

    override fun onBind(intent: Intent): IBinder? = null

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return
        }

        val channel = NotificationChannel(
            CHANNEL_ID,
            "MQTT Service",
            NotificationManager.IMPORTANCE_LOW
        )

        val manager = getSystemService(NotificationManager::class.java)
        manager.createNotificationChannel(channel)
    }

    private fun createNotification(): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("MQTT Running in Background")
            .setSmallIcon(android.R.drawable.stat_notify_sync)
            .build()
    }

    private fun loadPhoneNumber(): String {
        if (loadedPhoneNumber != null) {
            return loadedPhoneNumber!!
        }

        val stored = PreferenceController.loadKey(
            this, getString(R.string.pref_phone_number_key)
        )

        loadedPhoneNumber = stored
        return stored
    }
}
