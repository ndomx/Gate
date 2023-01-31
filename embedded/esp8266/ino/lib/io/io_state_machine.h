#ifndef LIB_IO_STATEMACHINE_H
#define LIB_IO_STATEMACHINE_H

#include <Arduino.h>

#include "io_states.h"

class IO_StateMachine
{
    public:
    IO_StateMachine(const uint8_t output_pin, uint32_t active_timeout_ms, uint32_t disabled_timeout_ms);
    IO_StateMachine(const uint8_t output_pin, uint32_t active_timeout_ms);
    IO_StateMachine(const uint8_t output_pin);

    void init(void);
    void set_flag(void);
    void run(void);

    private:
    uint8_t _output_pin;

    IO_States _state = IO_STATE_IDLE;
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

#endif // LIB_IO_STATEMACHINE_H