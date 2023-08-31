import os
from pathlib import Path
from state_machine import StateMachine
from libs.mqtt.mqtt_client import MqttClient
import libs.config as config

from gpiozero import DigitalOutputDevice as digital_output
from gpiozero import Button as button

config_file = Path() / 'secrets.json'

if __name__ == '__main__':
    config.load_secrets(config_file)

    output_controller = digital_output(os.environ.get('RELAY_CONTROLLER_PIN'))
    input_controller = button(os.environ.get('BYPASS_BUTTON_PIN'), pull_up=True)

    state_machine = StateMachine(output_controller)
    input_controller.when_pressed = state_machine.set_flag

    mqtt_client = MqttClient()
    mqtt_client.connect(lambda msg: state_machine.set_flag())

    while True:
        state_machine.run()