#ifndef LIB_MQTT_MQTT_H
#define LIB_MQTT_MQTT_H

#include <Arduino.h>

#include "../io/gpio_handler.h"
#include "mqtt_defs.h"
#include "connection.h"

namespace mqtt
{
    bool init(connection_t connection, GpioHandler* handler);
    bool connect(const char* username, const char* password, const char* topic);
    void run(void);
} // namespace mqtt

#endif // LIB_MQTT_MQTT_H