#ifndef LIBS_IO_GPIO_HANDLER_H
#define LIBS_IO_GPIO_HANDLER_H

#include "gpio_controller.h"

class GpioHandler
{
    public:
    GpioHandler(GpioController* controller);
    void execute_command(void);

    private:
    GpioController* _controller;
};

#endif // LIBS_IO_GPIO_HANDLER_H