#ifndef LIBS_TIMERS_TIMER_H
#define LIBS_TIMERS_TIMER_H

#include <Arduino.h>

#include <stdint.h>

typedef void (*timer_event)(uint32_t);

struct Timer
{
    public:
    Timer(bool cyclic, uint32_t period, timer_event on_event) : cyclic(cyclic), period(period)
    {
        this->on_event = on_event;
        _elapsed = millis();
    }

    const bool cyclic;
    const uint32_t period;
    timer_event on_event;

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