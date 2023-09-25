#ifndef LIB_MQTT_MQTT_H
#define LIB_MQTT_MQTT_H

#include <Arduino.h>

#include "../io/gpio_handler.h"
#include "mqtt_defs.h"

namespace mqtt
{
    bool init(const char* url, const int port, GpioHandler* handler, const uint8_t reconnection = MQTT_RECONNECT_ASYNC);
    bool connect(const char* username, const char* password, const char* topic);
    void run(void);
} // namespace mqtt

#endif // LIB_MQTT_MQTT_H