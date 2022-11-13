import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenGateRequestDto } from '../dtos/open-gate-request.dto';
import { OpenGateResponseDto } from '../dtos/open-gate-response.dto';
import { Node, NodeDocument } from '../schemas/node.shema';
import { User, UserDocument } from '../schemas/user.schema';
import { OpenGateRequestCodes } from '../values/error-codes';
import { MqttService } from './mqtt.service';

@Injectable()
export class GatesService {
  constructor(
    @InjectModel(Node.name) private nodeModel: Model<NodeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly mqttService: MqttService,
  ) {}

  async requestAccess(
    request: OpenGateRequestDto,
  ): Promise<OpenGateResponseDto> {
    // verify that user exists
    const user = await this.userModel.findById(request.userId);
    if (!user) {
      return {
        errorCode: OpenGateRequestCodes.USER_NOT_FOUND,
        success: false,
      };
    }

    // verify if user has access to root
    const permission = user.access.find((p) => p.rootId === request.rootId);
    if (!permission) {
      return {
        message: 'user cannot access to root',
        errorCode: OpenGateRequestCodes.ACCESS_DENIED,
        success: false,
      };
    }

    // verify if device exists
    let node = await this.nodeModel.findById(request.deviceId);
    if (!node) {
      return {
        errorCode: OpenGateRequestCodes.DEVICE_NOT_FOUND,
        success: false,
      };
    }

    if (!node.isDevice) {
      return {
        errorCode: OpenGateRequestCodes.NOT_DEVICE,
        success: false,
      };
    }

    // verify if device is child of root
    const nodes = [node.name];
    while (node.parent) {
      node = await this.nodeModel.findById(node.parent);
      if (!node) {
        return {
          errorCode: OpenGateRequestCodes.DATABASE_ERROR,
          success: false,
        };
      }

      nodes.push(node.name);
    }

    if (node._id.toHexString() !== request.rootId) {
      return {
        errorCode: OpenGateRequestCodes.ROOT_NOT_FOUND,
        success: false,
      };
    }

    // verify prefix
    const topic = nodes.reverse().join('/');
    if (!topic.startsWith(permission.prefix)) {
      return {
        message: 'user cannot activate the requested device',
        errorCode: OpenGateRequestCodes.ACCESS_DENIED,
        success: false,
      };
    }

    this.#grantAccess(topic);

    return {
      topic,
      success: true,
    };
  }

  #grantAccess(topic: string) {
    this.mqttService.open(topic);
  }
}
