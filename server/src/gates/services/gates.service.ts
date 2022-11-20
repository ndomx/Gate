import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenGateRequestDto } from '../dtos/request/open-gate-request.dto';
import { OpenGateResponseDto } from '../dtos/response/open-gate-response.dto';
import { Node, NodeDocument } from '../schemas/node.shema';
import { User, UserDocument } from '../schemas/user.schema';
import { ErrorCodes } from '../values/error-codes';
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
        errorCode: ErrorCodes.USER_NOT_FOUND,
        success: false,
      };
    }

    // verify that node exists
    const node = await this.nodeModel.findById(request.deviceId);
    if (!node) {
      return {
        errorCode: ErrorCodes.DEVICE_NOT_FOUND,
        success: false,
      };
    }

    // verify that node is device
    if (!node.nodeInfo.isDevice) {
      return {
        errorCode: ErrorCodes.NOT_DEVICE,
        success: false,
      };
    }

    // verify that user root is the same that node root
    if (user.rootId !== node.rootId) {
      return {
        errorCode: ErrorCodes.ACCESS_DENIED,
        success: false,
      };
    }

    // verify tree
    const nodes = [node.name];
    let tempNode = node;
    while (tempNode.parent) {
      tempNode = await this.nodeModel.findById(tempNode.parent);
      if (!tempNode) {
        return {
          errorCode: ErrorCodes.DATABASE_ERROR,
          success: false,
        };
      }

      nodes.push(tempNode.name);
    }

    if (tempNode._id.toHexString() !== node.rootId) {
      return {
        errorCode: ErrorCodes.ROOT_NOT_FOUND,
        success: false,
      };
    }

    // verify prefix
    const topic = nodes.reverse().join('/');
    if (!user.access.find((prefix) => topic.startsWith(prefix))) {
      return {
        message: 'user does not have access rights for the requested gate',
        errorCode: ErrorCodes.ACCESS_DENIED,
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
