package com.ndomx.phonecontroller.mqtt

import android.content.Context
import org.eclipse.paho.client.mqttv3.*

object MqttManager {
    private const val BROKER_URL = "tcp://broker.hivemq.com:1883" // Change this to your broker
    private const val CLIENT_ID = "AndroidClient"
    private var mqttClient: MqttClient? = null
    private var connectionCallback: (() -> Unit)? = null

    fun connect(context: Context, onConnected: () -> Unit, onFailure: (Exception) -> Unit) {
        try {
            mqttClient = MqttClient(BROKER_URL, CLIENT_ID, null)
            val options = MqttConnectOptions().apply {
                isCleanSession = true
            }

            mqttClient?.setCallback(object : MqttCallback {
                override fun connectionLost(cause: Throwable?) {
                    println("MQTT Connection lost: ${cause?.message}")
                }

                override fun messageArrived(topic: String?, message: MqttMessage?) {
                    println("MQTT Message received on $topic: ${message.toString()}")
                }

                override fun deliveryComplete(token: IMqttDeliveryToken?) {}
            })

            mqttClient?.connect(options)
            connectionCallback = onConnected
            onConnected()
        } catch (e: Exception) {
            onFailure(e)
        }
    }

    fun subscribe(topic: String, onMessageReceived: (String) -> Unit) {
        mqttClient?.subscribe(topic) { _, message ->
            // todo: parse message
            onMessageReceived(String(message.payload))
        }
    }

    fun publish(topic: String, message: String) {
        mqttClient?.publish(topic, MqttMessage(message.toByteArray()))
    }

    fun disconnect() {
        mqttClient?.disconnect()
    }
}
