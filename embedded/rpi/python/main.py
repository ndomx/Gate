import json
import os
from pathlib import Path
from pin_table import pin_to_bcm
from mqtt_client import MqttClient
from state_machine import StateMachine

from gpiozero import DigitalOutputDevice as digital_output
from gpiozero import Button as button

GPIO_DATA_FILENAME = 'gpio.json'

GPIO_OUTPUT_CONTROLLER = 'output_controller'
GPIO_INPUT_CONTROLLER = 'input_controller'

def load_gpio_from_json():
    path = Path() / GPIO_DATA_FILENAME
    if not os.path.exists(path):
        raise FileNotFoundError('Couldn\'t locate gpio.json file')

    if not os.path.isfile(path):
        raise FileNotFoundError('Couldn\'t locate gpio.json file')

    with open(path) as gpio_file:
        gpio_defs = json.load(gpio_file)

    output_bcm = pin_to_bcm(gpio_defs['relay_controller_pin'])
    input_bcm = pin_to_bcm(gpio_defs['bypass_button_pin'])

    return {
        GPIO_OUTPUT_CONTROLLER: digital_output(output_bcm, initial_value=False),
        GPIO_INPUT_CONTROLLER: button(input_bcm, pull_up=True)
    }

if __name__ == '__main__':
    mqtt_client = MqttClient()

    gpio = load_gpio_from_json()

    state_machine = StateMachine(gpio[GPIO_OUTPUT_CONTROLLER])
    gpio[GPIO_INPUT_CONTROLLER].when_pressed = state_machine.set_flag

    mqtt_client.connect(lambda msg: state_machine.set_flag())

    while True:
        state_machine.run()