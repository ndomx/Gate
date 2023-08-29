#ifndef LIB_MQTT_MQTT_H
#define LIB_MQTT_MQTT_H

#include <Arduino.h>

#include "mqtt_defs.h"

namespace mqtt
{
    typedef void (*callback_t)(void);
    bool init(callback_t callback, const uint8_t reconnection = MQTT_RECONNECT_ASYNC);
    bool connect(void);
    void run(void);
} // namespace mqtt

#endif // LIB_MQTT_MQTT_H