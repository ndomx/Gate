#include <wifi.h>

#include <PubSubClient.h>
#include <WiFiClient.h>

#include "../credentials.h"
#include "mqtt.h"
#include "mqtt_packet.h"

#define MQTT_CLIENT_ID_SIZE (23)
#define ID_HEADER "esp8266-"

namespace mqtt
{
    static WiFiClient wifi_client;
    static PubSubClient mqtt_client;

    static callback_t mqtt_callback;

    static String mqtt_client_id;

    static uint8_t reconnection_strategy;

    static void on_message(char* topic, uint8_t* payload, size_t length)
    {
        if (mqtt_callback != nullptr)
        {
            mqtt_callback();
        }
    }

    static bool generate_client_id(void)
    {
        mqtt_client_id = ID_HEADER;

        uint8_t mac[MAC_ADDR_SIZE];
        size_t length = wifi::get_mac_addr(mac);
        if (length != MAC_ADDR_SIZE)
        {
            // did not write mac address
            return false;
        }

        for (size_t i = 0; i < length; i++)
        {
            mqtt_client_id += String(mac[i], HEX);
        }

        return true;
    }

    bool init(callback_t callback, const uint8_t reconnection)
    {
        if (!wifi::is_connected())
        {
            return false;
        }

        mqtt_client.setClient(wifi_client);
        mqtt_client.setServer(mqtt_broker_url, mqtt_broker_port);
        mqtt_client.setCallback(on_message);

        mqtt_callback = callback;
        reconnection_strategy = reconnection;

        return true;
    }

    bool connect(void)
    {
        bool success;

        success = generate_client_id();
        if (!success)
        {
            return false;
        }

        success = mqtt_client.connect(mqtt_client_id.c_str(), mqtt_username, mqtt_password);
        if (!success)
        {
            return false;
        }

        success = mqtt_client.subscribe(mqtt_topic);
        return success;
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

        success = mqtt_client.connect(mqtt_client_id.c_str(), mqtt_username, mqtt_password);
        if (!success)
        {
            return false;
        }

        success = mqtt_client.subscribe(mqtt_topic);
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