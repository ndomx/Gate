import json
import os

import paho.mqtt.client as mqtt

from libs.common.command import Command
from libs.common.constants import ExecuteCommandResult
from libs.io.digital_io_handler import DigitalIOHandler

ACK_TOPIC = 'gate/ack'

class MqttClient:
    client = mqtt.Client()

    def __init__(self, handler: DigitalIOHandler):
        self.handler = handler
        self.device_id = os.getenv('DEVICE_ID')

    def connect(self):
        self.client.on_connect = lambda client, userdata, flags, rc: self.__on_connect()
        self.client.on_message = lambda client, userdata, msg: self.__on_message(msg)

        self.client.username_pw_set(
            username=os.getenv('MQTT_USERNAME'),
            password=os.getenv('MQTT_PASSWORD')
        )

        self.client.connect(
            host=os.getenv('MQTT_BROKER_URL'),
            port=int(os.getenv('MQTT_BROKER_PORT')),
        )

        self.client.loop_start()

    def __on_connect(self):
        print('connected to server')
        self.client.subscribe(f'node/{self.device_id}')

    def __on_message(self, msg: mqtt.MQTTMessage):
        print(f'receiving msg on {msg.topic}')

        payload = msg.payload.decode('utf-8')
        try:
            parsed = json.loads(payload)
            command = Command.from_json(parsed)
        except json.decoder.JSONDecodeError:
            self.__send_ack(ExecuteCommandResult.INVALID_PAYLOAD)
            return
        except ValueError as e:
            self.__send_ack(ExecuteCommandResult.INVALID_COMMAND)
            return

        result = self.handler.execute_command(command)
        self.__send_ack(result)

    def __send_ack(self, result: ExecuteCommandResult):
        payload = {
            "deviceId": self.device_id,
            "status": int(result)
        }

        self.client.publish(ACK_TOPIC, json.dumps(payload))