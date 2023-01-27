#include <mqtt.h>
#include <state_machine.h>
#include <wifi.h>

#include "global_defs.h"

StateMachine state_machine(OUTPUT_PIN);

void setup_error(const char* message)
{
    Serial.println(message);
    while (true)
    {
    }
}

void setup()
{
    // debug serial
    Serial.begin(115200);
    while (!Serial)
    {
    }

    wifi::connect_blocking();
    state_machine.init();

    bool success = mqtt::init([]() { state_machine.set_flag(); });
    if (!success)
    {
        setup_error("Error initializing mqtt, please try again");
    }

    success = mqtt::connect();
    if (!success)
    {
        setup_error("Error connecting to mqtt server");
    }

    Serial.println("Setup success");
}

void loop()
{
    mqtt::run();
    state_machine.run();
}