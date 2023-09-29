#include "gpio_controller.h"

void GpioController::on(void)
{
    _state = HIGH;
    write_state();
}

void GpioController::off(void)
{
    _state = LOW;
    write_state();
}

void GpioController::toggle(void)
{
    _state ^= 0b1;
    write_state();
}

void GpioController::write_state(void)
{
    digitalWrite(_output_pin, (_invert_logic) ? !_state : _state);
}
