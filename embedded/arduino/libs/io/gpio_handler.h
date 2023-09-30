#ifndef LIBS_IO_GPIO_HANDLER_H
#define LIBS_IO_GPIO_HANDLER_H

#include <ArduinoJson.h>
#include <stdint.h>

#include "../common/constants.h"
#include "gpio_controller.h"

class GpioHandler
{
    public:
    GpioHandler(GpioController* controller);

    uint8_t execute_command(DynamicJsonDocument& json) const;

    private:
    GpioController* _controller;

    bool is_valid_json(DynamicJsonDocument& json) const;
    uint32_t extract_timeout(DynamicJsonDocument& json) const;
};

#endif // LIBS_IO_GPIO_HANDLER_H
