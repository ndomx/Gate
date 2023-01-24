#include <wifi.h>
#include <state_machine.h>

#include "global_defs.h"

void setup()
{
    StateMachine state_machine(OUTPUT_PIN);

    Serial.begin(115200);
    Serial.println("Connecting to WiFi");

    wifi::connect_blocking();

    Serial.println("Connected");
}

void loop()
{
}