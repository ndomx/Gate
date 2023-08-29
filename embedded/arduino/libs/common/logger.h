#ifndef LIB_COMMON_LOGGER_H
#define LIB_COMMON_LOGGER_H

#include <Arduino.h>

enum LogLevel
{
    LOG_INFO,
    LOG_DEBUG,
    LOG_WARN,
    LOG_ERROR,
    LOG_COUNT,
};

namespace logger
{
    void init(const uint8_t log_level);
    void init(void);

    void log_info(const char* tag, const char* message);
    void log_debug(const char* tag, const char* message);
    void log_warning(const char* tag, const char* message);
    void log_error(const char* tag, const char* message);
} // namespace logger

#endif // LIB_COMMON_LOGGER_H