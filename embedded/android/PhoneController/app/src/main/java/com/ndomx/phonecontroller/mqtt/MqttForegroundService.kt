package com.ndomx.phonecontroller.mqtt

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import com.ndomx.phonecontroller.CallsService

class MqttForegroundService : Service() {
    companion object {
        private const val CHANNEL_ID = "MqttServiceChannel"
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        startForeground(1, createNotification())

        MqttManager.connect(this, {
            println("MQTT Connected")
        }, {
            println("MQTT Connection failed: ${it.message}")
        })
    }

    override fun onDestroy() {
        super.onDestroy()
        MqttManager.disconnect()
        println("MQTT Service Stopped")
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
}
