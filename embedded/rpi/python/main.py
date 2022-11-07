from mqtt_client import MqttClient
from state_machine import StateMachine

RELAY_ON_DURATION = 1

if __name__ == '__main__':
    mqtt_client = MqttClient()
    state_machine = StateMachine(RELAY_ON_DURATION)

    mqtt_client.connect('home/main', lambda msg: state_machine.set_flag())

    while True:
        state_machine.run()