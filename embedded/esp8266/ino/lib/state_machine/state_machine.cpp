#include "state_machine.h"

#define DEFAULT_TIMEOUT_MS 1000

StateMachine::StateMachine(const uint8_t output_pin, uint32_t active_timeout_ms, uint32_t disabled_timeout_ms)
{
    _active_timeout = active_timeout_ms;
    _disabled_timeout = disabled_timeout_ms;

    _init_gpio(output_pin);
}

StateMachine::StateMachine(const uint8_t output_pin, uint32_t active_timeout_ms)
{
    _active_timeout = active_timeout_ms;
    _disabled_timeout = DEFAULT_TIMEOUT_MS;

    _init_gpio(output_pin);
}

StateMachine::StateMachine(const uint8_t output_pin)
{
    _active_timeout = DEFAULT_TIMEOUT_MS;
    _disabled_timeout = DEFAULT_TIMEOUT_MS;

    _init_gpio(output_pin);
}

void StateMachine::set_flag(void)
{
    _action_flag = true;
}

void StateMachine::run(void)
{
    switch (_state)
    {
        case STATE_IDLE: _on_state_idle(); break;
        case STATE_ACTIVE: _on_state_active(); break;
        case STATE_DISABLED: _on_state_disabled(); break;
        case STATE_ERROR: _on_state_error(); break;
        default: _set_state_error(); break;
    }
}

void StateMachine::_init_gpio(const uint8_t output_pin)
{
    _output_pin = output_pin;

    pinMode(output_pin, OUTPUT);
    digitalWrite(output_pin, LOW);
}

void StateMachine::_set_state_idle(void)
{
    _state = STATE_IDLE;
    _action_flag = false;
}

void StateMachine::_set_state_active(void)
{
    _state = STATE_ACTIVE;
    digitalWrite(_output_pin, HIGH);

    _stopwatch = millis();
}

void StateMachine::_set_state_disabled(void)
{
    _state = STATE_DISABLED;
    digitalWrite(_output_pin, LOW);

    _stopwatch = millis();
}

void StateMachine::_set_state_error(void)
{
    _state = STATE_ERROR;
    digitalWrite(_output_pin, LOW);
    _action_flag = false;
}

void StateMachine::_on_state_idle(void)
{
    if (_action_flag)
    {
        _set_state_active();
    }
}

void StateMachine::_on_state_active(void)
{
    uint32_t dt = millis() - _stopwatch;
    if (dt > _active_timeout)
    {
        _set_state_disabled();
    }
}

void StateMachine::_on_state_disabled(void)
{
    uint32_t dt = millis() - _stopwatch;
    if (dt > _disabled_timeout)
    {
        _set_state_idle();
    }
}

void StateMachine::_on_state_error(void)
{
}
