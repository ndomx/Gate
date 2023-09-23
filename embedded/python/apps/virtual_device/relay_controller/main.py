import dotenv
import os
import sys

from pathlib import Path
from libs.io.digital_io_handler import DigitalIOHandler
from libs.io.virtual_io_controller import VirtualIOController

sys.path.append(os.path.abspath(Path()))

from libs.mqtt.mqtt_client import MqttClient


if __name__ == '__main__':
    dotenv.load_dotenv()

    controller = VirtualIOController(initial_state=False)
    handler = DigitalIOHandler(controller)

    mqtt_client = MqttClient()
    mqtt_client.connect(lambda command: handler.execute_command(command))

    while True:
        pass
