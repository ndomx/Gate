package com.ndomx.phonecontroller.mqtt

import android.content.Context
import android.util.Log
import com.ndomx.phonecontroller.BuildConfig
import com.ndomx.phonecontroller.api.Command
import com.ndomx.phonecontroller.api.ExecuteCommandResult
import com.ndomx.phonecontroller.api.CommandResponse
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.MissingFieldException
import kotlinx.serialization.json.Json
import org.eclipse.paho.client.mqttv3.*

object MqttManager : MqttCallbackExtended {
    private const val LOG_TAG = "MqttManager"

    private const val SUB_TOPIC = "node/${BuildConfig.DEVICE_ID}"
    private const val PUB_TOPIC = "gate/ack"

    private val supportedActions = listOf("call")

    private var mqttClient: MqttClient? = null

    private val statusStateFlow = MutableStateFlow(ConnectionStatus.DISCONNECTED)
    val status = statusStateFlow.asStateFlow()

    private val sendingStateFlow = MutableStateFlow(false)
    val sending = sendingStateFlow.asStateFlow()

    fun start(context: Context) {
        if (mqttClient?.isConnected == true) {
            return
        }

        createClient()
        connect(context)
    }

    fun disconnect() {
        mqttClient?.disconnect()
        statusStateFlow.value = ConnectionStatus.DISCONNECTED
    }

    override fun connectComplete(reconnect: Boolean, serverURI: String?) {
        Log.i(LOG_TAG, "MQTT Connected to $serverURI")
        statusStateFlow.value = ConnectionStatus.CONNECTED
        subscribe()
    }

    override fun connectionLost(cause: Throwable?) {
        Log.e(LOG_TAG, "MQTT Connection lost: ${cause?.message}", cause)
        statusStateFlow.value = ConnectionStatus.DISCONNECTED
    }

    override fun messageArrived(topic: String?, message: MqttMessage?) {
        Log.i(LOG_TAG, "MQTT Message received on $topic: ${message.toString()}")
    }

    override fun deliveryComplete(token: IMqttDeliveryToken?) {
        sendingStateFlow.value = false
    }

    private fun connect(context: Context) = CoroutineScope(Dispatchers.IO).launch {
        statusStateFlow.value = ConnectionStatus.CONNECTING

        val options = MqttConnectOptions().apply {
            isCleanSession = true
            userName = BuildConfig.MQTT_USERNAME
            password = BuildConfig.MQTT_PASSWORD.toCharArray()
        }

        try {
            mqttClient?.connect(options)
        } catch (e: Exception) {
            Log.e(LOG_TAG, "MQTT Connection error: ${e.message}", e)
            statusStateFlow.value = ConnectionStatus.ERROR
            mqttClient = null
        }
    }

    private fun subscribe() {
        Log.i(LOG_TAG, "MQTT Subscribing to $SUB_TOPIC")

        mqttClient?.subscribe(SUB_TOPIC) { _, message ->
            onMessage(String(message.payload))
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
            Log.e(LOG_TAG, "invalid payload: $message", e)
            ExecuteCommandResult.INVALID_PAYLOAD
        } catch (e: MissingFieldException) {
            Log.e(LOG_TAG, "invalid command: $message", e)
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
