import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenGateRequestDto } from '../dtos/open-gate-request.dto';
import { OperationResult } from '../dtos/open-gate-response.dto';
import { Gate, GateDocument } from '../schemas/gate.schema';
import { MqttService } from './mqtt.service';

@Injectable()
export class GatesService {
  constructor(
    @InjectModel(Gate.name) private gateModel: Model<GateDocument>,
    private readonly mqttService: MqttService,
  ) {}

  async requestAccess(request: OpenGateRequestDto): Promise<OperationResult> {
    const gate = await this.#getGateIfAllowed(request.gateId, request.deviceKey);
    if (!gate) {
      return 'access-denied';
    }

    this.#grantAccess(gate);

    return 'access-granted';
  }

  async #getGateIfAllowed(gateId: string, deviceKey: string): Promise<Gate> {
    const gate = await this.gateModel.findOne({ gateId });
    if (!gate) {
      return null;
    }

    if (gate.allowedDevices.includes(deviceKey)) {
      return gate;
    }
  }

  #grantAccess(gate: Gate) {
    this.mqttService.open(gate.topic);
  }
}
