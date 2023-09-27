#include <Arduino.h>

#include "timers_handler.h"

Timer* TimersHandler::_timer = nullptr;

void TimersHandler::update(void)
{
    if (test_timer())
    {
        _timer->event.execute();
    }
}

bool TimersHandler::set_timer(uint32_t delay_ms, Event event)
{
    if (_timer != nullptr)
    {
        return false;
    }

    _timer = new Timer(delay_ms, event);
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
    return (now > _timer->delay_ms + _timer->elapsed());
}
