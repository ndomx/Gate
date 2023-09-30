#include <ESP8266WiFi.h>

#include "wifi.h"

namespace wifi
{
    static WiFiClient client;

    void connect_blocking(const char* ssid, const char* pass)
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

    WiFiClient& get_client(void)
    {
        return client;
    }
} // namespace wifi