#ifndef LIBS_IO_GPIO_CONTROLLER_H
#define LIBS_IO_GPIO_CONTROLLER_H

#include <Arduino.h>

class GpioController
{
    public:
    GpioController(uint8_t output_pin, bool initial_state, bool invert_logic)
        : _output_pin(output_pin), _invert_logic(invert_logic)
    {
        pinMode(_output_pin, OUTPUT);
        (initial_state) ? on() : off();
    }

    GpioController(uint8_t output_pin, bool initial_state) : GpioController(output_pin, initial_state, false)
    {
    }

    GpioController(uint8_t output_pin) : GpioController(output_pin, false, false)
    {
    }

    void on(void);
    void off(void);
    void toggle(void);

    private:
    const uint8_t _output_pin;
    const bool _invert_logic;

    bool _state;
};

#endif // LIBS_IO_GPIO_CONTROLLER_H