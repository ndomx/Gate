import dotenv
import os
import sys

from pathlib import Path
sys.path.append(os.path.abspath(Path()))

from apps.rpi.relay_controller.io_controller import IOController
from libs.io.digital_io_handler import DigitalIOHandler
from libs.rpi.common.pin_table import load_bcm
from libs.mqtt.mqtt_client import MqttClient

# from gpiozero import Button as button

if __name__ == '__main__':
    dotenv.load_dotenv()

    output_pin = load_bcm('RELAY_CONTROLLER_PIN')
    # input_pin = load_bcm('BYPASS_BUTTON_PIN')

    # output_controller = digital_output(output_pin, initial_value=False)
    # input_controller = button(input_pin, pull_up=True)

    # input_controller.when_pressed = state_machine.set_flag

    controller = IOController(output_pin, initial_state=False)
    handler = DigitalIOHandler(controller)

    mqtt_client = MqttClient(handler)
    mqtt_client.connect()

    while True:
        pass