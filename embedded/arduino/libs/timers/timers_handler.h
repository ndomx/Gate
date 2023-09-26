#ifndef LIBS_TIMER_TIMERS_HANDLER_H
#define LIBS_TIMER_TIMERS_HANDLER_H

#include <stdint.h>

#include "../events/events_handler.h"
#include "timer.h"

class TimersHandler
{
    public:
    TimersHandler(EventsHandler* event_handler);

    void update(void);
    bool set_timer(bool cyclic, uint32_t period, timer_event on_event);
    void stop_timer(void);

    inline bool in_use(void) const
    {
        return _timer != nullptr;
    }

    private:
    EventsHandler* _event_handler;
    static Timer* _timer;

    bool test_timer(void);
    void reset(void);
};

#endif // LIBS_TIMER_TIMERS_HANDLER_H
