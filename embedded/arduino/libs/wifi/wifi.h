#ifndef LIB_WIFI_WIFI_H
#define LIB_WIFI_WIFI_H

#include <Arduino.h>
#include <WiFiClient.h>

namespace wifi
{
    void connect_blocking(const char* ssid, const char* pass);
    bool is_connected(void);
    WiFiClient& get_client(void);
} // namespace wifi

#endif // LIB_WIFI_WIFI_H