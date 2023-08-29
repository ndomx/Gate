#ifndef LIB_IO_STATEMACHINE_H
#define LIB_IO_STATEMACHINE_H

#include <Arduino.h>

#include "io_states.h"

#define DEFAULT_TIMEOUT_MS (1000U)
#define DEFAULT_INVERTED_LOGIC (false)

class IO_StateMachine
{
    public:
    IO_StateMachine(
        const uint8_t output_pin, const bool inverted_logic, const uint32_t active_timeout_ms,
        const uint32_t disabled_timeout_ms
    )
        : _output_pin(output_pin), _inverted_logic(inverted_logic), _active_timeout(active_timeout_ms),
          _disabled_timeout(disabled_timeout_ms)
    {
    }

    IO_StateMachine(const uint8_t output_pin, const bool invert_logic)
        : _output_pin(output_pin), _inverted_logic(invert_logic), _active_timeout(DEFAULT_TIMEOUT_MS),
          _disabled_timeout(DEFAULT_TIMEOUT_MS)
    {
    }

    IO_StateMachine(const uint8_t output_pin)
        : _output_pin(output_pin), _inverted_logic(DEFAULT_INVERTED_LOGIC), _active_timeout(DEFAULT_TIMEOUT_MS),
          _disabled_timeout(DEFAULT_TIMEOUT_MS)
    {
    }

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