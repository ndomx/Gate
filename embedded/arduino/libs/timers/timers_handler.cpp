#include <Arduino.h>

#include "timers_handler.h"

Timer* TimersHandler::_timer = nullptr;

TimersHandler::TimersHandler(EventsHandler* event_handler)
{
    _event_handler = event_handler;
}

void TimersHandler::update(void)
{
    if (test_timer())
    {
        Event event = {
            .callback = [](uint32_t id, void* t) { ((Timer*) t)->on_event(millis()); },
            .executor = (void*) _timer,
        };

        _event_handler->push_event(event);
    }
}

bool TimersHandler::set_timer(bool cyclic, uint32_t period, timer_event on_event)
{
    if (_timer != nullptr)
    {
        return false;
    }

    _timer = new Timer(cyclic, period, on_event);
    return true;
}

void TimersHandler::stop_timer(void)
{
    if (_timer != nullptr)
    {
        delete _timer;
        _timer = nullptr;
    }
}

bool TimersHandler::test_timer(void)
{
    if (_timer == nullptr)
    {
        return false;
    }

    uint32_t now = millis();
    return (now > _timer->period + _timer->elapsed());
}

void TimersHandler::reset(void)
{
    if (_timer == nullptr)
    {
        return;
    }

    if (_timer->cyclic)
    {
        _timer->reset();
    }
}
