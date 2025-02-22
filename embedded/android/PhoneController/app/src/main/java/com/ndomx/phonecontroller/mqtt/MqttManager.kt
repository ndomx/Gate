package com.ndomx.phonecontroller.mqtt

import android.content.Context
import com.ndomx.phonecontroller.BuildConfig
import org.eclipse.paho.client.mqttv3.*
import java.io.BufferedInputStream
import java.security.KeyStore
import java.security.cert.CertificateFactory
import javax.net.ssl.SSLContext
import javax.net.ssl.SSLSocketFactory
import javax.net.ssl.TrustManagerFactory

object MqttManager {
    private var mqttClient: MqttClient? = null

    private var connectionCallback: (() -> Unit)? = null

    fun connect(context: Context, onConnected: () -> Unit, onFailure: (Exception) -> Unit) {
        try {
            if (mqttClient?.isConnected == true) {
                return
            } else if (mqttClient != null) {
                disconnect()
            } else {
                createClient()
            }

            val options = MqttConnectOptions().apply {
                isCleanSession = true
                userName = BuildConfig.MQTT_USERNAME
                password = BuildConfig.MQTT_PASSWORD.toCharArray()

            }

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

    private fun createClient() {
        val uri = buildConnectionUri()
        mqttClient = MqttClient(uri, BuildConfig.DEVICE_ID, null).apply {
            setCallback(object : MqttCallback {
                override fun connectionLost(cause: Throwable?) {
                    println("MQTT Connection lost: ${cause?.message}")
                }

                override fun messageArrived(topic: String?, message: MqttMessage?) {
                    println("MQTT Message received on $topic: ${message.toString()}")
                }

                override fun deliveryComplete(token: IMqttDeliveryToken?) {}
            })
        }
    }

    private fun buildConnectionUri(): String {
        val host = BuildConfig.MQTT_BROKER_URL
        val port = BuildConfig.MQTT_BROKER_PORT
        return "ssl://$host:$port"
    }

    private fun getSSLSocketFactory(context: Context): SSLSocketFactory {
        val caInput = context.assets.open("ca.crt")
        val caBuffer = BufferedInputStream(caInput)

        val certificateFactory = CertificateFactory.getInstance("X.509")
        val ca = certificateFactory.generateCertificate(caBuffer)

        val keyStore = KeyStore.getInstance(KeyStore.getDefaultType()).apply {
            load(null, null)
            setCertificateEntry("ca", ca)
        }

        val tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm()).apply {
            init(keyStore)
        }

        return SSLContext.getInstance("TLS").run {
            init(null, tmf.trustManagers, null)
            socketFactory
        }
    }
}
