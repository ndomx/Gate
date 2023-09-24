import dotenv
import os
import sys

from pathlib import Path
sys.path.append(os.path.abspath(Path()))

from libs.rpi.io.io_controller import IOController
from libs.io.digital_io_handler import DigitalIOHandler
from libs.rpi.common.pin_table import load_bcm
from libs.mqtt.mqtt_client import MqttClient

if __name__ == '__main__':
    dotenv.load_dotenv()

    output_pin = load_bcm('RELAY_CONTROLLER_PIN')

    controller = IOController(output_pin, initial_state=False)
    handler = DigitalIOHandler(controller)

    mqtt_client = MqttClient(handler)
    mqtt_client.connect()

    while True:
        pass