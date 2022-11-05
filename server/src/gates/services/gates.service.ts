import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenGateRequestDto } from '../dtos/open-gate-request.dto';
import { OperationResult } from '../dtos/open-gate-response.dto';
import { Gate, GateDocument } from '../schemas/gate.schema';

@Injectable()
export class GatesService {
  constructor(@InjectModel(Gate.name) private gateModel: Model<GateDocument>) {}

  async requestAccess(request: OpenGateRequestDto): Promise<OperationResult> {
    if (!this.#isAllowed(request.gateId, request.deviceId)) {
      return 'access-denied';
    }

    this.#grantAccess(request.gateId);

    return 'access-granted';
  }

  async #isAllowed(gateId: string, deviceId: string): Promise<boolean> {
    const gate = await this.gateModel.findOne({ gateId }).exec();
    if (!gate) {
      return false;
    }

    return gate.allowedDevices.includes(deviceId);
  }

  #grantAccess(gateId: string) {}
}
