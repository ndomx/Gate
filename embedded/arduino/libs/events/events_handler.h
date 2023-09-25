#ifndef LIBS_EVENTS_EVENTS_HANDLER_H
#define LIBS_EVENTS_EVENTS_HANDLER_H

#include <stddef.h>

#include "event.h"
#include "../misc/queue.h"

class EventsHandler
{
    public:
    // EventsHandler(void);

    static bool push_event(Event event);
    static size_t available(void);
    static void execute_next(void);

    private:
    static uint32_t _event_counter;
    static queue<Event> _queue;
};

#endif // LIBS_EVENTS_EVENTS_HANDLER_H