#include "logger.h"

#ifdef __DEBUG

#define SERIAL_BAUDRATE (115200)
#define WAIT_BEFORE_START (1000)

namespace logger
{
    static LogLevel _log_level = LOG_INFO;

    static void log_message(const char* level, const char* tag, const char* message)
    {
        String msg = "[" + String(level) + "] ";
        msg += String(tag) + ": ";
        msg += String(message);

        Serial.println(msg);
    }

    void init(const uint8_t log_level)
    {
        _log_level = (log_level < LOG_COUNT) ? (LogLevel) log_level : LOG_INFO;

        Serial.begin(SERIAL_BAUDRATE);
        while (!Serial)
        {
            yield();
        }

        // wait some more
        delay(WAIT_BEFORE_START);

        log_info("logger", "initialized serial debugging");
    }

    void init(void)
    {
        init(LOG_INFO);
    }

    void log_info(const char* tag, const char* message)
    {
        if (_log_level == LOG_INFO)
        {
            log_message("INFO", tag, message);
        }
    }

    void log_debug(const char* tag, const char* message)
    {
        if (_log_level <= LOG_DEBUG)
        {
            log_message("DEBUG", tag, message);
        }
    }

    void log_warning(const char* tag, const char* message)
    {
        if (_log_level <= LOG_WARN)
        {
            log_message("WARNING", tag, message);
        }
    }

    void log_error(const char* tag, const char* message)
    {
        if (_log_level <= LOG_ERROR)
        {
            log_message("ERROR", tag, message);
        }
    }
} // namespace logger

#else

namespace logger
{
    void init(const uint8_t log_level)
    {
    }

    void init(void)
    {
    }

    void log_info(const char* tag, const char* message)
    {
    }

    void log_debug(const char* tag, const char* message)
    {
    }

    void log_warning(const char* tag, const char* message)
    {
    }

    void log_error(const char* tag, const char* message)
    {
    }
} // namespace logger

#endif
