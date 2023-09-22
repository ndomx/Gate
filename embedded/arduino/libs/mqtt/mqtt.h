#ifndef LIB_MQTT_MQTT_H
#define LIB_MQTT_MQTT_H

#include <Arduino.h>

#include "mqtt_defs.h"
#include "connection_params.h"

namespace mqtt
{
    bool init(ConnectionParams params, const uint8_t reconnection = MQTT_RECONNECT_ASYNC);
    bool connect(const char* username, const char* password, const char* topic);
    void run(void);
} // namespace mqtt

#endif // LIB_MQTT_MQTT_H