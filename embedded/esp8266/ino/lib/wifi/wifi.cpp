#include <ESP8266WiFi.h>
#include <WiFiClient.h>

#include "wifi.h"
#include "../credentials.h"

namespace wifi
{
    void connect_blocking(void)
    {
        WiFi.mode(WIFI_STA);
        WiFi.begin(ssid, pass);

        while (WiFi.status() != WL_CONNECTED)
        {
            delay(500);
        }
    }

    bool is_connected(void)
    {
        return (WiFi.status() == WL_CONNECTED);
    }

    size_t get_mac_addr(uint8_t* mac)
    {
        WiFi.macAddress(mac);
        return MAC_ADDR_SIZE;
    }
} // namespace wifi