#ifndef LIB_MQTT_PACKET_H
#define LIB_MQTT_PACKET_H

#include <stdint.h>

struct MqttPacket
{
    char* topic;
    uint8_t* payload;
    unsigned int length;
};

#endif // LIB_MQTT_PACKET_H