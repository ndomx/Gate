#include "gpio_handler.h"

GpioHandler::GpioHandler(GpioController* controller, TimersHandler* timers_handler)
{
    _controller = controller;
    _timers_handler = timers_handler;
}

void GpioHandler::execute_command(void)
{
    _controller->toggle();
    _timers_handler->set_timer(
        1000,
        {
            .callback = [](void* e) { ((GpioController*) e)->toggle(); },
            .executor = (void*) _controller,
        }
    );
}