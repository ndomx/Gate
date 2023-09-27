#ifndef LIBS_TIMER_TIMERS_HANDLER_H
#define LIBS_TIMER_TIMERS_HANDLER_H

#include <stdint.h>

#include "../events/events.h"
#include "timer.h"

class TimersHandler
{
    public:
    void update(void);
    bool set_timer(uint32_t delay_ms, Event event);
    void stop_timer(void);

    inline bool in_use(void) const
    {
        return _timer != nullptr;
    }

    private:
    static Timer* _timer;

    bool test_timer(void);
};

#endif // LIBS_TIMER_TIMERS_HANDLER_H
