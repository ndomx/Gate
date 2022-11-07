import paho.mqtt.client as mqtt

MQTT_BROKER = 'broker.emqx.io'

class MqttClient:
    client = mqtt.Client(transport='websockets')

    def connect(self, topic, callback):
        self.client.on_connect = lambda client, userdata, flags, rc: self.__on_connect(topic)
        self.client.on_message = lambda client, userdata, msg: self.__on_message(msg, callback)
        self.client.connect(MQTT_BROKER, 8083)
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

