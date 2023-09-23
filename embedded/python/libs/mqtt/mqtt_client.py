import json
import os
from types import FunctionType
from typing import Callable
import paho.mqtt.client as mqtt

from libs.common.command import Command

class MqttClient:
    client = mqtt.Client()

    def connect(self, callback: FunctionType):
        self.client.on_connect = lambda client, userdata, flags, rc: self.__on_connect()
        self.client.on_message = lambda client, userdata, msg: self.__on_message(msg, callback)

        url = os.getenv('MQTT_BROKER_URL')
        port = int(os.getenv('MQTT_BROKER_PORT'))

        self.client.connect(url, port)
        self.client.loop_start()

    def __on_connect(self):
        print('connected to server')
        
        topic = os.getenv('MQTT_TOPIC', '')
        if topic == '':
            self.client.disconnect()
            print('invalid topic')

            return
        
        self.client.subscribe(topic)

    def __on_message(self, msg: mqtt.MQTTMessage, callback: Callable[[Command], None]):
        print(f'receiving msg on {msg.topic}')

        payload = msg.payload.decode('utf-8')
        try:
            parsed = json.loads(payload)
            command = Command.from_json(parsed)
        except json.decoder.JSONDecodeError:
            print('payload is not a json')
            return
        except ValueError as e:
            print('[WARN] could not parse json into command')
            return

        if callback:
            callback(command)