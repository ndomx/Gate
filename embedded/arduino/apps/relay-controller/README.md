# Relay Controller

## Get Started

### Installing the required libraries

### Setup

To connect your device to a WiFi access point, rename the file `lib/credentials.example.h` to just `credentials.h` and replace the default values with your own values:

- Set `ssid` to your WiFi network name
- Set `pass` to your WiFi network password (if required)
- Set `mqtt_broker_url` to the host url (you can use the default for testing purposes)
- Change `mqtt_broker_port` if needed (defaults to 1883)
- Set `mqtt_username` to your mqtt username. If your connection does not require login, leave this undefined
- Set `mqtt_password` to your mqtt password. If your connection does not require login, leave this undefined
- Set `mqtt_topic` to the topic the device will subscribe to (`<root-id>/path/to/device`)

To build the code, create a copy of `build-params.example.mk` file and name it `build-params.mk`. Then replace the default values with your own values:

- Set `ARDUINO_CLI` to your `arduino-cli` installation path. If you added `arduino-cli` to `PATH`, leave the default value
- Set `PORT` to the serial port assigned to your programmer or module
- Set `BOARD_NAME` to the _Fully Qualified Board Name_ of the board you will be using (See `arduino-cli` documentation for more information)
- If you want to debug your code, uncomment the `BUILD_TYPE` variable, as suggested in the file

## Further customizing the code

There are a few parameters that can be adjusted to your own personal needs. These parameters don't depend on the user who is building the code or running the application, and thus can be shared and tracked. Keep in mind that **changing these values is completely optional**.

In the file `main/global_defs.h` you will find all GPIO definitions. If your module work with a different pinout, you should replace the default values with your own.

There are 4 levels of logging available. These are (in ascending order of importance) `INFO, DEBUG, WARN, ERROR`. By default, the logger logs every single message, but you can specify the minimum level of debugging messages (i.e only log `WARN` messages and up). To do this, replace the `logger::init()` call from `main/main.ino` for `logger::init(<desired-logging-level>)`. Acceptable values are in the enum `LogLevel`, found in `lib/common/logger.h`.

In the file `lib/common/logger.cpp` you will find two macros that are only defined for debug builds.
- `SERIAL_BAUDRATE`: sets the baud rate for the serial communication. Defaults to 115200
- `WAIT_BEFORE_START`: specifies an amount of time (in milliseconds) that the processor should wait before printing the first log message. Defaults to 1000

A MQTT reconnection policy can be specified in the main program (`main/main.ino`) when the MQTT lib is initiated. The possible values are defined in `lib/mqtt/mqtt_defs.h`:
- `MQTT_NO_RECONNECT`: don't try to reconnect. Note that a reset will be required to reconnect the device if connection is lost
- `MQTT_RECONNECT_ASYNC`: try to reconnect only after asserting there is a WiFi connection available
- `MQTT_RECONNECT_BLOCKING`: stop the program execution until the device is reconnected

By default, the app sets the MQTT client ID to `esp8266-<device-mac-address>`. If this convention doesn't suit your needs, you will have to overwrite the function `generate_client_id`, that is located exclusively in `lib/mqtt/mqtt.cpp` (this function is not exposed to other modules).

The class `IO_State_Machine` takes 3 parameters:
- `output_pin`: this is the digital output that is controlled by the state machine. This parameter is mandatory.
- `active_timeout`: the amount of time the digital output is set after being triggered. This parameter is optional and defaults to 1000 (milliseconds)
- `disabled_timeout`: the amount of time the state machine is disabled before receiving another trigger. This parameter is optional and defaults to 1000 (milliseconds)

In `main/main.ino` this class is called using both default values, but you can adjust the active and disabled time with any `uint32_t` value (_0 ms_ up to _~4,000,000,000 ms_).
