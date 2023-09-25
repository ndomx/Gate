#include "gpio_controller.h"

void GpioController::on(void)
{
    digitalWrite(_output_pin, (_invert_logic) ? false : true);
    _state = true;
}

void GpioController::off(void)
{
    digitalWrite(_output_pin, (_invert_logic) ? true : false);
    _state = false;
}

void GpioController::toggle(void)
{
    (_state) ? off() : on();
}
