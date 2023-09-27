#ifndef LIBS_EVENTS_EVENT_H
#define LIBS_EVENTS_EVENT_H

#include <stdint.h>

typedef void (*event_callback_t)(void*);

struct Event
{
    event_callback_t callback;
    void* executor;

    inline void execute(void)
    {
        callback(executor);
    }
};

#endif // LIBS_EVENTS_EVENT_H