#include "io_state_machine.h"

void IO_StateMachine::init(void)
{
    pinMode(_output_pin, OUTPUT);
    _set_output(LOW);
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
    _set_output(HIGH);

    _stopwatch = millis();
}

void IO_StateMachine::_set_state_disabled(void)
{
    _state = IO_STATE_DISABLED;
    _set_output(LOW);

    _stopwatch = millis();
}

void IO_StateMachine::_set_state_error(void)
{
    _state = IO_STATE_ERROR;
    _set_output(LOW);
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

void IO_StateMachine::_set_output(const uint8_t state) const
{
    digitalWrite(_output_pin, state ^ _inverted_logic);
}
