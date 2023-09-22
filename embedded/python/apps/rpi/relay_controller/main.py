import os
from pathlib import Path
import sys
sys.path.append(os.path.abspath(Path()))

import dotenv
from libs.rpi.common.pin_table import load_bcm
from state_machine import StateMachine
from libs.mqtt.mqtt_client import MqttClient

from gpiozero import DigitalOutputDevice as digital_output
from gpiozero import Button as button

if __name__ == '__main__':
    dotenv.load_dotenv()

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