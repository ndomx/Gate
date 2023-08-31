import os
from pathlib import Path
from apps.rpi.libs.common.pin_table import load_bcm
from state_machine import StateMachine
from libs.mqtt.mqtt_client import MqttClient
import libs.config as config

from gpiozero import DigitalOutputDevice as digital_output
from gpiozero import Button as button

config_file = Path() / 'config.json'

if __name__ == '__main__':
    config.load_secrets(config_file)

    output_pin = load_bcm('RELAY_CONTROLLER_PIN')
    input_pin = load_bcm('BYPASS_BUTTON_PIN')

    output_controller = digital_output(output_pin, initial_value=False)
    input_controller = button(input_pin, pull_up=True)

    state_machine = StateMachine(output_controller)
    input_controller.when_pressed = state_machine.set_flag

    mqtt_client = MqttClient()
    mqtt_client.connect(lambda msg: state_machine.set_flag())

    while True:
        state_machine.run()