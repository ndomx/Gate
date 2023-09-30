#include <PubSubClient.h>
#include <ArduinoJson.h>

#include "mqtt.h"
#include "mqtt_packet.h"
#include "../wifi/wifi.h"

#define INPUT_BUF_SIZE (128)
#define OUTPUT_BUF_SIZE (64)

namespace mqtt
{
    static PubSubClient mqtt_client;

    static GpioHandler* _handler;

    static String mqtt_client_id;

    static uint8_t reconnection_strategy;

    static String _username;
    static String _password;
    static String _topic;

    static DynamicJsonDocument input_json(INPUT_BUF_SIZE);
    static char* output_buffer;

    static void send_ack(uint8_t status)
    {
        const int size = JSON_OBJECT_SIZE(2);
        StaticJsonDocument<size> json;

        json["deviceId"] = mqtt_client_id.c_str();
        json["status"] = status;

        serializeJson(json, output_buffer, OUTPUT_BUF_SIZE);
        mqtt_client.publish("gate/ack", output_buffer);
    }

    static void on_message(char* topic, uint8_t* payload, size_t length)
    {
        auto error = deserializeJson(input_json, payload);
        if (error)
        {
            send_ack(COMMAND_INVALID_PAYLOAD);
            return;
        }

        auto result = _handler->execute_command(input_json);
        send_ack(result);
    }

    bool init(connection_t connection, GpioHandler* handler)
    {
        if (!wifi::is_connected())
        {
            return false;
        }

        mqtt_client.setClient(wifi::get_client());
        mqtt_client.setServer(connection.url, connection.port);
        mqtt_client.setCallback(on_message);

        mqtt_client_id = String(connection.client_id);

        _handler = handler;
        reconnection_strategy = connection.reconnection;

        output_buffer = new char[OUTPUT_BUF_SIZE];

        return true;
    }

    bool connect(const char* username, const char* password, const char* topic)
    {
        bool success;
        success = mqtt_client.connect(mqtt_client_id.c_str(), username, password);
        if (!success)
        {
            return false;
        }

        success = mqtt_client.subscribe(topic);
        if (!success)
        {
            return false;
        }

        _username = String(username);
        _password = String(password);
        _topic = String(topic);

        return true;
    }

    static bool reconnect(void)
    {
        bool success;

        bool blocking = (reconnection_strategy == MQTT_RECONNECT_BLOCKING);
        while (blocking && !wifi::is_connected())
        {
            delay(500);
        }

        if (!wifi::is_connected())
        {
            return false;
        }

        const char *username = _username.c_str();
        const char *password = _username.c_str();
        const char *topic = _username.c_str();

        success = mqtt_client.connect(mqtt_client_id.c_str(), username, password);
        if (!success)
        {
            return false;
        }

        success = mqtt_client.subscribe(topic);
        return success;
    }

    void run(void)
    {
        if (!mqtt_client.connected())
        {
            if (reconnection_strategy != MQTT_NO_RECONNECT)
            {
                reconnect();
            }

            return;
        }

        mqtt_client.loop();
    }
} // namespace mqtt