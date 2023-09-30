#ifndef LIBS_MQTT_CONNECTION_H
#define LIBS_MQTT_CONNECTION_H

#include <stdint.h>

namespace mqtt
{
    struct connection_t
    {
        const char* url;
        const int port;
        const char* client_id;
        const uint8_t reconnection;
    };
} // namespace mqtt

#endif // LIBS_MQTT_CONNECTION_H
