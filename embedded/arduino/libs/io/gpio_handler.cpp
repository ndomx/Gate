#include "gpio_handler.h"

#include "../scheduler/scheduler.h"

GpioHandler::GpioHandler(GpioController* controller)
{
    _controller = controller;
}

void GpioHandler::execute_command(void)
{
    _controller->toggle();

    scheduler::set_task(
        1000, [](void* e) { ((GpioController*) e)->toggle(); }, (void*) _controller
    );
}