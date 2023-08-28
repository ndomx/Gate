import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, MqttClient } from 'mqtt';
import { IActionable } from 'src/common/interfaces/actionable.interface';
import { NodeResponseDto } from 'src/nodes/dtos/responses';
import { ActionableHandlerDto } from 'src/common/dtos/commons/actionable-handler.dto';

@Injectable()
export class MqttService implements IActionable {
  private logger = new Logger();
  private client: MqttClient;

  constructor(private readonly configService: ConfigService) {
    this.#clientSetup();
  }

  async activateDevice(
    node: NodeResponseDto,
    params: ActionableHandlerDto,
  ): Promise<void> {
    const topic = `${node.rootId}/${params.path}`;
    const payload = {
      action: params.action,
      body: params.body,
    };

    this.logger.debug(`[${topic}] ${payload}`, 'MqttService');
    await this.#publish(topic, payload);
  }

  #clientSetup() {
    this.client = connect(this.configService.get('MQTT_SERVER_URL'), {
      username: this.configService.get('MQTT_USER'),
      password: this.configService.get('MQTT_PASS'),
      port: +this.configService.get('MQTT_PORT'),
      protocol: 'tcp',
    });

    this.client.on('connect', () => {
      this.logger.log('connected to MQTT broker', 'MqttService');
    });
  }

  async #publish(topic: string, payload: object) {
    if (!this.client) {
      this.#clientSetup();
    }

    await this.client.publish(topic, JSON.stringify(payload));
  }
}
