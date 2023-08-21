import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, MqttClient } from 'mqtt';
import { IActionable } from 'src/common/interfaces/actionable.interface';
import { ActivateMqttDeviceRequestDto } from '../dtos/requests/activate-mqtt-device-request.dto';
import { NodeResponseDto } from 'src/nodes/dtos/responses';

let client: MqttClient;

@Injectable()
export class MqttService implements IActionable {
  constructor(private readonly configService: ConfigService) {
    this.#clientSetup();
  }

  async activateDevice(
    node: NodeResponseDto,
    activateRequest: ActivateMqttDeviceRequestDto,
  ): Promise<void> {
    const topic = `${node.rootId}/${activateRequest.topic}`;
    const payload = {
      action: activateRequest.action,
      body: activateRequest.actionDetails,
    };

    await client.publish(topic, JSON.stringify(payload));
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
