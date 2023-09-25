#ifndef LIBS_EVENTS_EVENT_H
#define LIBS_EVENTS_EVENT_H

#include <stdint.h>

typedef void (*event_callback_t)(uint32_t, void*);

struct Event
{
    uint32_t id;
    event_callback_t callback;
    void* executor;
};

#endif // LIBS_EVENTS_EVENT_H