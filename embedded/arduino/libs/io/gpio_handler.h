#ifndef LIBS_IO_GPIO_HANDLER_H
#define LIBS_IO_GPIO_HANDLER_H

#include "gpio_controller.h"
#include "../timers/timers.h"

class GpioHandler
{
    public:
    GpioHandler(GpioController* controller, TimersHandler* timers_handler);
    
    void execute_command(void);

    private:
    GpioController* _controller;
    TimersHandler* _timers_handler;
};

#endif // LIBS_IO_GPIO_HANDLER_H