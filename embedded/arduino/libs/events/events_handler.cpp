#include "events_handler.h"

#ifndef QUEUE_MAX_SIZE
#define QUEUE_MAX_SIZE (10)
#endif

uint32_t EventsHandler::_event_counter = 0;
queue<Event> EventsHandler::_queue = queue<Event>(QUEUE_MAX_SIZE);

bool EventsHandler::push_event(Event event)
{
    return _queue.push(event);
}

size_t EventsHandler::available(void)
{
    return _queue.count();
}

void EventsHandler::execute_next(void)
{
    if (_queue.count() == 0)
    {
        return;
    }

    Event e;
    _queue.pop(&e);

    e.callback(e.id, e.executor);
}
