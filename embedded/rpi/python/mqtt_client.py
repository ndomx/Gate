import json
import paho.mqtt.client as mqtt
import os
from pathlib import Path

KEY_MQTT_BROKER_URL = 'MQTT_BROKER_URL'
KEY_MQTT_BROKER_PORT = 'MQTT_BROKER_PORT'

class MqttClient:
    client = mqtt.Client(transport='websockets')

    __broker_url = ''
    __broker_port = 0

    def connect(self, topic, callback):
        self.client.on_connect = lambda client, userdata, flags, rc: self.__on_connect(topic)
        self.client.on_message = lambda client, userdata, msg: self.__on_message(msg, callback)

        self.__load_secrets()

        self.client.connect(self.__broker_url, self.__broker_port)
        self.client.loop_start()

    def __on_connect(self, topic):
        print('Connected to server')
        if topic == '':
            self.client.disconnect()
            print('Invalid topic')
            return

        self.client.subscribe(topic)

    def __on_message(self, msg, callback):
        message = msg.payload.decode('utf-8')
        print(f'{msg.topic}: {message}')
        if callback:
            callback(message)

    def __load_secrets(self):
        path = Path() / 'secrets.json'
        if not os.path.exists(path):
            raise FileNotFoundError('Couldn\'t locate secrets.json file')

        if not os.path.isfile(path):
            raise FileNotFoundError('Couldn\'t locate secrets.json file')

        with open(path) as secrets_file:
            secrets = json.load(secrets_file)
        
        self.__broker_url = secrets[KEY_MQTT_BROKER_URL]
        self.__broker_port = secrets[KEY_MQTT_BROKER_PORT]

