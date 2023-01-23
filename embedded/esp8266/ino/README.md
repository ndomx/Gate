# ESP8266 - Arduino

> To build the software you will need to install the [Arduino CLI](https://arduino.github.io/arduino-cli/0.29/)

## Get Started

### Installing the required libraries

### Setup

To connect your device to a WiFi access point, rename the file `lib/wifi/credentials.example.h` to just `credentials.h` and replace the default values with your own values:

- Set `ssid` to your WiFi network name
- Set `pass` to your WiFi network password (if required)

### Build

To build the code, create a copy of `private.example.mk` file and name it `private.mk`. The replace the default values with your own values:

- Set `ARDUINO_CLI` to your `arduino-cli` installation path. If you added `arduino-cli` to `PATH`, leave the default value
