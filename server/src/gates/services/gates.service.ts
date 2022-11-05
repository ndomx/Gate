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
    const isAllowed = await this.#isAllowed(request.gateId, request.deviceKey);
    if (!isAllowed) {
      return 'access-denied';
    }

    this.#grantAccess(request.gateId);

    return 'access-granted';
  }

  async #isAllowed(gateId: string, deviceKey: string): Promise<boolean> {
    const gate = await this.gateModel.findOne({ gateId });
    if (!gate) {
      return false;
    }

    return gate.allowedDevices.includes(deviceKey);
  }

  #grantAccess(gateId: string) {}
}
