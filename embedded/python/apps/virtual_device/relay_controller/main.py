import dotenv
import os
import sys

from pathlib import Path
sys.path.append(os.path.abspath(Path()))

from libs.io.digital_io_handler import DigitalIOHandler
from libs.io.virtual_io_controller import VirtualIOController
from libs.mqtt.mqtt_client import MqttClient


if __name__ == '__main__':
    dotenv.load_dotenv()

    controller = VirtualIOController(initial_state=False)
    handler = DigitalIOHandler(controller)

    mqtt_client = MqttClient(handler)
    mqtt_client.connect()

    while True:
        pass
