import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client';
import { ErrorCodes } from 'src/common/enum/error-codes.enum';
import { NodesClientService } from 'src/nodes-client/nodes-client.service';
import { UsersClientService } from 'src/users-client/users-client.service';
import { ActivateDeviceResponseDto } from './dtos/activate-device-response.dto';

@Injectable()
export class GatesService {
  constructor(
    private readonly nodesClientService: NodesClientService,
    private readonly usersClientService: UsersClientService,
    @Inject('MQTT_BROKER_SERVICE') private readonly mqttClient: ClientProxy,
  ) {}

  async activateDevice(
    deviceId: string,
    userId: string,
  ): Promise<ActivateDeviceResponseDto> {
    // verify user
    const user = await this.usersClientService.getUser(userId);

    // verify node
    const node = await this.nodesClientService.getNodeInRoot(
      deviceId,
      user.rootId,
    );

    // is device node
    if (!node.nodeInfo.isDevice) {
      throw new BadRequestException({
        error_code: ErrorCodes.NOT_DEVICE,
        message: 'node is not a device',
      });
    }

    // verify permission
    const path = await this.nodesClientService.getPathForNode(deviceId);
    const hasAccess = user.access.some((prefix) => path.startsWith(prefix));
    if (!hasAccess) {
      throw new UnauthorizedException({ error_code: ErrorCodes.ACCESS_DENIED });
    }

    // grant access
    const topic = `${node.rootId}/${path}`;
    this.mqttClient.emit(topic, {
      action: 'open',
    });

    // response
    const response = new ActivateDeviceResponseDto();
    response.node = node;
    response.success = true;
    response.topic = path;

    return response;
  }
}
