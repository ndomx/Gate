import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
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
      throw new ForbiddenException({
        error_code: ErrorCodes.USER_NOT_FOUND,
      });
    }

    // verify that node exists
    const node = await this.nodeModel.findById(request.deviceId);
    if (!node) {
      throw new NotFoundException({
        error_code: ErrorCodes.DEVICE_NOT_FOUND,
      });
    }

    // verify that node is device
    if (!node.nodeInfo.isDevice) {
      throw new BadRequestException({
        error_code: ErrorCodes.NOT_DEVICE,
      });
    }

    // verify that user root is the same that node root
    if (user.rootId !== node.rootId) {
      throw new ForbiddenException({
        error_code: ErrorCodes.ACCESS_DENIED,
      });
    }

    // verify tree
    const nodes = [node.name];
    let tempNode = node;
    while (tempNode.parent) {
      tempNode = await this.nodeModel.findById(tempNode.parent);
      if (!tempNode) {
        throw new InternalServerErrorException({
          error_code: ErrorCodes.DATABASE_ERROR,
        });
      }

      nodes.push(tempNode.name);
    }

    if (tempNode._id.toHexString() !== node.rootId) {
      throw new BadRequestException({
        error_code: ErrorCodes.ROOT_NOT_FOUND,
        success: false,
      });
    }

    // verify prefix
    const topic = nodes.reverse().join('/');
    if (!user.access.find((prefix) => topic.startsWith(prefix))) {
      throw new ForbiddenException({
        message: 'user does not have access rights for the requested gate',
        error_code: ErrorCodes.ACCESS_DENIED,
      });
    }

    this.#grantAccess(topic);

    return { topic };
  }

  #grantAccess(topic: string) {
    this.mqttService.open(topic);
  }
}
