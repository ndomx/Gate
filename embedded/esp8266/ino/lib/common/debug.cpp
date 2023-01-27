#ifdef __DEBUG

#include "debug.h"

#define SERIAL_BAUDRATE (115200)

namespace debug
{
    static LogLevel _log_level = LOG_INFO;

    static void log_message(const char* level, const char* tag, const char* message)
    {
        String msg = "[" + String(level) + "] ";
        msg += String(tag) + ": ";
        msg += String(message);

        Serial.println(msg);
    }

    void init(const LogLevel log_level)
    {
        _log_level = log_level;

        Serial.begin(SERIAL_BAUDRATE);
        while (!Serial)
        {
        }

        log_info("debug", "initialized serial debugging");
    }

    void init(void)
    {
        init(LOG_INFO);
    }

    void log_info(const char* tag, const char* message)
    {
        log_message("INFO", tag, message);
    }

    void log_debug(const char* tag, const char* message)
    {
        log_message("DEBUG", tag, message);
    }

    void log_warning(const char* tag, const char* message)
    {
        log_message("WARNING", tag, message);
    }

    void log_error(const char* tag, const char* message)
    {
        log_message("ERROR", tag, message);
    }
} // namespace debug

#endif // __DEBUG