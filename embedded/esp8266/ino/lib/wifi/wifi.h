#ifndef LIB_WIFI_WIFI_H
#define LIB_WIFI_WIFI_H

#include <Arduino.h>

#define MAC_ADDR_SIZE (6)

namespace wifi
{
    void connect_blocking(void);
    bool is_connected(void);
    size_t get_mac_addr(uint8_t* mac);
} // namespace wifi

#endif // LIB_WIFI_WIFI_H