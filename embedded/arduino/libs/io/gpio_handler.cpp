#include "gpio_handler.h"

#include "../scheduler/scheduler.h"

GpioHandler::GpioHandler(GpioController* controller)
{
    _controller = controller;
}

void GpioHandler::execute_command(DynamicJsonDocument& json) const
{
    if (!is_valid_json(json))
    {
        return;
    }

    uint32_t timeout = extract_timeout(json);
    String action = json["action"];
    if (action.equals("on"))
    {
        _controller->on();
    }
    else if (action.equals("off"))
    {
        _controller->off();
    }
    else if (action.equals("toggle"))
    {
        _controller->toggle();
    }
    else
    {
        return;
    }

    if (timeout > 0)
    {
        scheduler::set_task(
            timeout, [](void* e) { ((GpioController*) e)->toggle(); }, (void*) _controller
        );
    }
}

bool GpioHandler::is_valid_json(DynamicJsonDocument& json) const
{
    return json.containsKey("action");
}

uint32_t GpioHandler::extract_timeout(DynamicJsonDocument& json) const
{
    if (!(json.containsKey("actionDetails")))
    {
        return 0;
    }

    auto details = json["actionDetails"];
    if (!(details.containsKey("timeout")))
    {
        return 0;
    }

    return details["timeout"].as<uint32_t>();
}
