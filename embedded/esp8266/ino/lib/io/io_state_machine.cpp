#include "io_state_machine.h"

#define DEFAULT_TIMEOUT_MS 1000

IO_StateMachine::IO_StateMachine(const uint8_t output_pin, uint32_t active_timeout_ms, uint32_t disabled_timeout_ms)
{
    _active_timeout = active_timeout_ms;
    _disabled_timeout = disabled_timeout_ms;

    _output_pin = output_pin;
}

IO_StateMachine::IO_StateMachine(const uint8_t output_pin, uint32_t active_timeout_ms)
{
    _active_timeout = active_timeout_ms;
    _disabled_timeout = DEFAULT_TIMEOUT_MS;

    _output_pin = output_pin;
}

IO_StateMachine::IO_StateMachine(const uint8_t output_pin)
{
    _active_timeout = DEFAULT_TIMEOUT_MS;
    _disabled_timeout = DEFAULT_TIMEOUT_MS;

    _output_pin = output_pin;
}

void IO_StateMachine::init(void)
{
    pinMode(_output_pin, OUTPUT);
    digitalWrite(_output_pin, LOW);
}

void IO_StateMachine::set_flag(void)
{
    _action_flag = true;
}

void IO_StateMachine::run(void)
{
    switch (_state)
    {
        case IO_STATE_IDLE: _on_state_idle(); break;
        case IO_STATE_ACTIVE: _on_state_active(); break;
        case IO_STATE_DISABLED: _on_state_disabled(); break;
        case IO_STATE_ERROR: _on_state_error(); break;
        default: _set_state_error(); break;
    }
}

void IO_StateMachine::_set_state_idle(void)
{
    _state = IO_STATE_IDLE;
    _action_flag = false;
}

void IO_StateMachine::_set_state_active(void)
{
    _state = IO_STATE_ACTIVE;
    digitalWrite(_output_pin, HIGH);

    _stopwatch = millis();
}

void IO_StateMachine::_set_state_disabled(void)
{
    _state = IO_STATE_DISABLED;
    digitalWrite(_output_pin, LOW);

    _stopwatch = millis();
}

void IO_StateMachine::_set_state_error(void)
{
    _state = IO_STATE_ERROR;
    digitalWrite(_output_pin, LOW);
    _action_flag = false;
}

void IO_StateMachine::_on_state_idle(void)
{
    if (_action_flag)
    {
        _set_state_active();
    }
}

void IO_StateMachine::_on_state_active(void)
{
    uint32_t dt = millis() - _stopwatch;
    if (dt > _active_timeout)
    {
        _set_state_disabled();
    }
}

void IO_StateMachine::_on_state_disabled(void)
{
    uint32_t dt = millis() - _stopwatch;
    if (dt > _disabled_timeout)
    {
        _set_state_idle();
    }
}

void IO_StateMachine::_on_state_error(void)
{
}
