#ifndef LIBS_TIMERS_TIMER_H
#define LIBS_TIMERS_TIMER_H

#include <Arduino.h>
#include <stdint.h>

#include "../events/event.h"

struct Timer
{
    public:
    Timer(uint32_t delay_ms, Event event) : delay_ms(delay_ms), event(event)
    {
        _elapsed = millis();
    }

    const uint32_t delay_ms;
    Event event;

    inline uint32_t elapsed() const
    {
        return _elapsed;
    }

    inline void reset(void)
    {
        _elapsed = millis();
    }

    private:
    uint32_t _elapsed;
};

#endif // LIBS_TIMERS_TIMER_H