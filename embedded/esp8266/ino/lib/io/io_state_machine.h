#ifndef LIB_IO_STATEMACHINE_H
#define LIB_IO_STATEMACHINE_H

#include <Arduino.h>

#include "io_states.h"

#define DEFAULT_TIMEOUT_MS 1000

class IO_StateMachine
{
    public:
    IO_StateMachine(
        const uint8_t output_pin, 
        const uint32_t active_timeout_ms = DEFAULT_TIMEOUT_MS,
        const uint32_t disabled_timeout_ms = DEFAULT_TIMEOUT_MS,
        const bool inverted_logic = false
    ) : _output_pin(output_pin), _active_timeout(active_timeout_ms), _disabled_timeout(disabled_timeout_ms), _inverted_logic(inverted_logic) {} 

    void init(void);
    void set_flag(void);
    void run(void);

    private:
    const uint8_t _output_pin;

    IO_States _state = IO_STATE_IDLE;
    bool _action_flag = false;
    uint32_t _stopwatch = 0;

    const uint32_t _active_timeout;
    const uint32_t _disabled_timeout;

    const bool _inverted_logic;

    void _set_state_idle(void);
    void _set_state_active(void);
    void _set_state_disabled(void);
    void _set_state_error(void);

    void _on_state_idle(void);
    void _on_state_active(void);
    void _on_state_disabled(void);
    void _on_state_error(void);

    void _set_output(const uint8_t state) const;
};

#endif // LIB_IO_STATEMACHINE_H