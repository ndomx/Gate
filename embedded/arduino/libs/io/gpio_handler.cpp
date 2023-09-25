#include "gpio_handler.h"

GpioHandler::GpioHandler(GpioController* controller)
{
    _controller = controller;
}

void GpioHandler::execute_command(void)
{
    _controller->toggle();
}