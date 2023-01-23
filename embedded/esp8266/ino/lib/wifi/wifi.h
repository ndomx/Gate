#ifndef LIB_WIFI_WIFI_H
#define LIB_WIFI_WIFI_H

#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <WiFiClient.h>

namespace wifi
{
    void connect_blocking(void);
    bool is_connected(void);
} // namespace wifi

#endif // LIB_WIFI_WIFI_H