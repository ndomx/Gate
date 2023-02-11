#include <errors.h>
#include <io_state_machine.h>
#include <logger.h>
#include <mqtt.h>
#include <wifi.h>

#include "global_defs.h"

#define TAG "main"

IO_StateMachine state_machine(OUTPUT_PIN, INVERT_LOGIC);

void setup()
{
    logger::init();

    logger::log_info(TAG, "connecting to wifi");

    wifi::connect_blocking();
    state_machine.init();

    logger::log_info(TAG, "connected to wifi");

    bool success = mqtt::init([]() { state_machine.set_flag(); });
    if (!success)
    {
        throw_blocking(TAG, "Error initializing mqtt, please try again");
    }

    logger::log_info(TAG, "mqtt initialized");

    success = mqtt::connect();
    if (!success)
    {
        throw_blocking(TAG, "Error connecting to mqtt server");
    }

    logger::log_info(TAG, "mqtt connected to server");
    logger::log_info(TAG, "Setup success");
}

void loop()
{
    mqtt::run();
    state_machine.run();
}