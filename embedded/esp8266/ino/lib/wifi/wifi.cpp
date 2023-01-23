#include "wifi.h"

#include "credentials.h"

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
} // namespace wifi