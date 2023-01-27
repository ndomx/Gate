#ifndef LIB_STATEMACHINE_STATEMACHINE_H
#define LIB_STATEMACHINE_STATEMACHINE_H

#include <Arduino.h>

#include "states.h"

class StateMachine
{
    public:
    StateMachine(const uint8_t output_pin, uint32_t active_timeout_ms, uint32_t disabled_timeout_ms);
    StateMachine(const uint8_t output_pin, uint32_t active_timeout_ms);
    StateMachine(const uint8_t output_pin);

    void init(void);
    void set_flag(void);
    void run(void);

    private:
    uint8_t _output_pin;

    States _state = STATE_IDLE;
    bool _action_flag = false;
    uint32_t _stopwatch = 0;

    uint32_t _active_timeout;
    uint32_t _disabled_timeout;

    void _set_state_idle(void);
    void _set_state_active(void);
    void _set_state_disabled(void);
    void _set_state_error(void);

    void _on_state_idle(void);
    void _on_state_active(void);
    void _on_state_disabled(void);
    void _on_state_error(void);
};

#endif // LIB_STATEMACHINE_STATEMACHINE_H