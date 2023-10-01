import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, MqttClient } from 'mqtt';
import { IActionable } from 'src/common/interfaces/actionable.interface';
import { NodeResponseDto } from 'src/nodes/dtos/responses';
import { ActionableHandlerDto } from 'src/common/dtos/commons/actionable-handler.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { plainToInstance } from 'class-transformer';
import { DeviceAckDto } from 'src/common/dtos/commons/device-ack.dto';
import { validateSync } from 'class-validator';

const ackTopic = 'gate/ack';

@Injectable()
export class MqttService implements IActionable, OnModuleInit {
  private logger = new Logger();
  private client: MqttClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  activateDevice(
    node: NodeResponseDto,
    params: ActionableHandlerDto,
  ): Promise<void> {
    const topic = `${node.rootId}/${params.path}`;
    const payload = {
      action: params.action,
      actionDetails: params.body,
    };

    this.logger.debug(`[${topic}] ${payload}`, 'MqttService');
    return this.#publish(topic, payload);
  }

  onModuleInit() {
    this.#clientSetup();
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
      this.client.subscribe(ackTopic, (err) => {
        if (err) {
          this.logger.error(err.message, 'MqttService');
        }
      });
    });

    this.client.on('message', (topic, payload) => {
      if (topic !== ackTopic) {
        this.logger.warn(
          `receive message from untracked topic: ${topic}`,
          'MqttService',
        );

        return;
      }

      this.#onDeviceResponse(payload);
    });
  }

  #publish(topic: string, payload: object): Promise<void> {
    if (!this.client) {
      this.#clientSetup();
    }

    return new Promise((resolve, reject) => {
      this.client.publish(
        topic,
        JSON.stringify(payload),
        {
          qos: 1,
        },
        (err, packet) => {
          if (err) {
            this.logger.error(`error sending ${packet}`, 'MqttService');
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }

  #onDeviceResponse(payload: Buffer) {
    const json = JSON.parse(payload.toString('utf-8'));
    const deviceStatus = plainToInstance(DeviceAckDto, json);
    const errors = validateSync(deviceStatus);
    if (errors.length > 0) {
      this.logger.warn('received invalid device ack', 'MqttService');
      return;
    }

    this.eventEmitter.emit('device.ack', json);
  }
}
