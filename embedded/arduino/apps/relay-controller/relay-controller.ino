#include <errors.h>
#include <io.h>
#include <logger.h>
#include <mqtt.h>
#include <scheduler.h>
#include <wifi.h>

#include "credentials.h"
#include "global_defs.h"

#define TAG "main"

void setup()
{
    logger::init();

    logger::log_info(TAG, "connecting to wifi");

    wifi::connect_blocking(ssid, pass);
    logger::log_info(TAG, "connected to wifi");

    GpioController* controller = new GpioController(OUTPUT_PIN, false, INVERT_LOGIC);
    GpioHandler* handler = new GpioHandler(controller);

    bool success = mqtt::init(mqtt_broker_url, mqtt_broker_port, handler, MQTT_RECONNECT_ASYNC);
    if (!success)
    {
        throw_blocking(TAG, "Error initializing mqtt, please try again");
    }

    logger::log_info(TAG, "mqtt initialized");

    success = mqtt::connect(mqtt_username, mqtt_password, mqtt_topic);
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
    scheduler::run_tasks();
}