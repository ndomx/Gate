import dotenv
import os
import sys

from pathlib import Path

sys.path.append(os.path.abspath(Path()))

from apps.virtual_device.relay_controller.io_handler import IOHandler
from libs.mqtt.mqtt_client import MqttClient


if __name__ == '__main__':
    dotenv.load_dotenv()

    io_handler = IOHandler()

    mqtt_client = MqttClient()
    mqtt_client.connect(lambda command: io_handler.execute_command(command))

    while True:
        pass
