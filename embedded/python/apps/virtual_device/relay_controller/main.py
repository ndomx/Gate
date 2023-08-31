import os
from pathlib import Path
import sys
sys.path.append(os.path.abspath(Path()))

import dotenv
from libs.io.virtual_io_controller import VirtualIOController
from state_machine import StateMachine
from libs.mqtt.mqtt_client import MqttClient

if __name__ == '__main__':
    dotenv.load_dotenv()

    output_controller = VirtualIOController(initial_state=False)
    state_machine = StateMachine(output_controller)

    mqtt_client = MqttClient()
    mqtt_client.connect(lambda msg: state_machine.set_flag())

    while True:
        state_machine.run()