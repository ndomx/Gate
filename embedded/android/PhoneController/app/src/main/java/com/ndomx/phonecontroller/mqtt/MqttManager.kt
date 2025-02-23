package com.ndomx.phonecontroller.mqtt

import android.content.Context
import com.ndomx.phonecontroller.BuildConfig
import com.ndomx.phonecontroller.contracts.Command
import com.ndomx.phonecontroller.contracts.ExecuteCommandResult
import com.ndomx.phonecontroller.contracts.CommandResponse
import com.ndomx.phonecontroller.mqtt.MqttManager.publish
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.MissingFieldException
import kotlinx.serialization.json.Json
import org.eclipse.paho.client.mqttv3.*
import java.io.BufferedInputStream
import java.security.KeyStore
import java.security.cert.CertificateFactory
import javax.net.ssl.SSLContext
import javax.net.ssl.SSLSocketFactory
import javax.net.ssl.TrustManagerFactory

object MqttManager : MqttCallbackExtended {
    private const val SUB_TOPIC = "node/${BuildConfig.DEVICE_ID}"
    private const val PUB_TOPIC = "gate/ack"

    private val supportedActions = listOf("call")

    private var mqttClient: MqttClient? = null

    private val statusStateFlow = MutableStateFlow(ConnectionStatus.DISCONNECTED)
    val status = statusStateFlow.asStateFlow()

    private val sendingStateFlow = MutableStateFlow(false)
    val sending = sendingStateFlow.asStateFlow()

    fun connect(context: Context) {
        if (mqttClient?.isConnected == true) {
            return
        }

        createClient()
        val options = MqttConnectOptions().apply {
            isCleanSession = true
            userName = BuildConfig.MQTT_USERNAME
            password = BuildConfig.MQTT_PASSWORD.toCharArray()
            socketFactory = getSSLSocketFactory(context)
        }

        statusStateFlow.value = ConnectionStatus.CONNECTING
        mqttClient?.connect(options)
    }

    fun disconnect() {
        mqttClient?.disconnect()
        statusStateFlow.value = ConnectionStatus.DISCONNECTED
    }

    override fun connectComplete(reconnect: Boolean, serverURI: String?) {
        subscribe()
    }

    override fun connectionLost(cause: Throwable?) {
        println("MQTT Connection lost: ${cause?.message}")
        statusStateFlow.value = ConnectionStatus.DISCONNECTED
    }

    override fun messageArrived(topic: String?, message: MqttMessage?) {
        println("MQTT Message received on $topic: ${message.toString()}")
    }

    override fun deliveryComplete(token: IMqttDeliveryToken?) {
        sendingStateFlow.value = false
    }

    private fun subscribe() {
        mqttClient?.subscribe(SUB_TOPIC) { _, message ->
            onMessage(message.payload.toString())
        }
    }

    private fun createClient() {
        if (mqttClient != null) {
            mqttClient?.disconnect()
            return
        }

        val uri = buildConnectionUri()
        mqttClient = MqttClient(uri, BuildConfig.DEVICE_ID, null).apply {
            setCallback(this@MqttManager)
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

    private fun publish(message: String) {
        if (mqttClient?.isConnected != true) {
            return
        }

        sendingStateFlow.value = true
        mqttClient?.publish(PUB_TOPIC, MqttMessage(message.toByteArray()))
    }

    @OptIn(ExperimentalSerializationApi::class)
    private fun onMessage(message: String) {
        val result = try {
            val command = Json.decodeFromString<Command>(message)
            if (supportedActions.contains(command.action)) {
                ExecuteCommandResult.OK
            } else {
                ExecuteCommandResult.INVALID_ACTION
            }
        } catch (e: IllegalArgumentException) {
            println("MQTT Message is not a valid command: $message")
            ExecuteCommandResult.INVALID_PAYLOAD
        } catch (e: MissingFieldException) {
            println("MQTT Message is not a valid command: $message")
            ExecuteCommandResult.INVALID_COMMAND
        }

        sendAck(result)
    }

    private fun sendAck(result: ExecuteCommandResult) {
        val message = CommandResponse(
            deviceId = BuildConfig.DEVICE_ID,
            status = result.value
        )

        publish(
            Json.encodeToString(message)
        )
    }
}
