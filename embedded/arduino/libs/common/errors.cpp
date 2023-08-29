#include <Arduino.h>

#include "errors.h"
#include "logger.h"

void throw_blocking(const char* caller, const char* message)
{
    logger::log_error(caller, message);
    while (true)
    {
        yield();
    }
}