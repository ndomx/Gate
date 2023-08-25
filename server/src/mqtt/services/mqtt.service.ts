import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, MqttClient } from 'mqtt';
import { IActionable } from 'src/common/interfaces/actionable.interface';
import { ActivateMqttDeviceRequestDto } from '../dtos/requests/activate-mqtt-device-request.dto';
import { NodeResponseDto } from 'src/nodes/dtos/responses';
import { ActivateDeviceRequestDto } from 'src/common/dtos/requests/activate-device-request.dto';

let client: MqttClient;

@Injectable()
export class MqttService implements IActionable {
  private logger = new Logger();

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

  validatePayload(_activateRequest: ActivateDeviceRequestDto) {
    return;
  }

  #clientSetup() {
    client = connect(this.configService.get('MQTT_SERVER_URL'), {
      username: this.configService.get('MQTT_USER'),
      password: this.configService.get('MQTT_PASS'),
      port: +this.configService.get('MQTT_PORT'),
      protocol: 'tcp',
    });

    client.on('connect', () => {
      this.logger.log('connected to MQTT broker', 'MqttService');
    });
  }
}
