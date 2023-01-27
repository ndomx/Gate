#ifndef LIB_COMMON_DEBUG_H
#define LIB_COMMON_DEBUG_H

#ifdef __DEBUG

#include <Arduino.h>

namespace debug
{
    enum LogLevel
    {
        LOG_INFO,
        LOG_DEBUG,
        LOG_WARN,
        LOG_ERROR,
        LOG_COUNT,
    };

    void init(const LogLevel log_level);
    void init(void);

    void log_info(const char* tag, const char* message);
    void log_debug(const char* tag, const char* message);
    void log_warning(const char* tag, const char* message);
    void log_error(const char* tag, const char* message);
} // namespace debug

#endif // __DEBUG

#endif // LIB_COMMON_DEBUG_H