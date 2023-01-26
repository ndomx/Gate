#ifndef LIB_MQTT_MQTT_H
#define LIB_MQTT_MQTT_H

#include <PubSubClient.h>
#include <WiFiClient.h>

#include "mqtt_packet.h"

namespace mqtt
{
    typedef void (*callback_t)(void);
    bool init(callback_t callback);
    bool connect(void);
    void run(void);
} // namespace mqtt

#endif // LIB_MQTT_MQTT_H