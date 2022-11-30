import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, MqttClient } from 'mqtt';
import { ActivateDeviceDto } from './dtos/activate-device.dto';

let client: MqttClient;

@Injectable()
export class MqttService {
  constructor(private readonly configService: ConfigService) {
    this.#clientSetup();
  }

  activateDevice(topic: string, payload: ActivateDeviceDto) {
    client.publish(topic, JSON.stringify(payload));
  }

  #clientSetup() {
    client = connect(this.configService.get('MQTT_SERVER_URL'), {
      username: this.configService.get('MQTT_USER'),
      password: this.configService.get('MQTT_PASS'),
      port: +this.configService.get('MQTT_PORT'),
      protocol: 'tcp',
    });

    client.on('connect', () => {
      console.log('connected to MQTT broker');
    });
  }
}
