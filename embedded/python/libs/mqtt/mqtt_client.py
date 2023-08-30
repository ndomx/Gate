import os
from types import FunctionType
import paho.mqtt.client as mqtt

class MqttClient:
    client = mqtt.Client()

    def connect(self, callback: FunctionType):
        self.__load_secrets()

        self.client.on_connect = lambda client, userdata, flags, rc: self.__on_connect()
        self.client.on_message = lambda client, userdata, msg: self.__on_message(msg, callback)

        url = os.environ.get('MQTT_BROKER_URL')
        port = int(os.environ.get('MQTT_BROKER_PORT'))

        self.client.connect(url, port)
        self.client.loop_start()

    def __on_connect(self):
        print('connected to server')
        
        topic = os.environ.get('MQTT_TOPiC', '')
        if topic == '':
            self.client.disconnect()
            print('invalid topic')

            return
        
        self.client.subscribe(topic)

    def __on_message(self, msg: mqtt.MQTTMessage, callback: FunctionType):
        message = msg.payload.decode('utf-8')
        print(f'{msg.topic}: {message}')
        if callback:
            callback(message)