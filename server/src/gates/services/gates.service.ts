import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorCodes } from 'src/common/enum/error-codes.enum';
import { MqttService } from 'src/mqtt/services/mqtt.service';
import { NodesService } from 'src/nodes/services/nodes.service';
import { UsersService } from 'src/users/services/users.service';
import { UserNodesResponseDto } from 'src/common/dtos/responses/user-nodes-response.dto';
import { plainToInstance } from 'class-transformer';
import { ActivateDeviceRequestDto } from '../../common/dtos/requests/activate-device-request.dto';
import { NodeActionCode } from 'src/utils/types';
import { IActionable } from 'src/common/interfaces/actionable.interface';

@Injectable()
export class GatesService {
  constructor(
    private readonly nodesService: NodesService,
    private readonly usersService: UsersService,
    private readonly mqttService: MqttService,
  ) {}

  async activateDevice(
    deviceId: string,
    userId: string,
    request: ActivateDeviceRequestDto,
  ): Promise<void> {
    // verify user
    const user = await this.usersService.findById(userId);

    // verify node
    const node = await this.nodesService.findInRoot(deviceId, user.rootId);

    // is device node
    if (!node.nodeInfo.isDevice) {
      throw new BadRequestException({
        error_code: ErrorCodes.NOT_DEVICE,
        message: 'node is not a device',
      });
    }

    // verify permission
    const path = await this.nodesService.getPathById(deviceId);
    const hasAccess = user.access.some((prefix) => path.startsWith(prefix));
    if (!hasAccess) {
      throw new UnauthorizedException({ errorCode: ErrorCodes.ACCESS_DENIED });
    }

    // grant access
    const handler = this.#mapActionToHandler(node.nodeInfo.actionCode);
    await handler.activateDevice(node, request);
  }

  async findUserNodes(
    userId: string,
    deviceOnly = true,
  ): Promise<UserNodesResponseDto> {
    const user = await this.usersService.findById(userId);

    const nodes = [];
    for (const prefix of user.access) {
      const children = await this.nodesService.findByPrefix(
        prefix,
        user.rootId,
      );

      const filtered = deviceOnly
        ? children.filter((node) => node.nodeInfo.isDevice)
        : children;

      nodes.push(...filtered);
    }

    const response: UserNodesResponseDto = { user, nodes };
    return plainToInstance(UserNodesResponseDto, response);
  }

  #mapActionToHandler(actionCode: NodeActionCode): IActionable {
    const handlerMap: Record<NodeActionCode, IActionable> = {
      'on/off': this.mqttService,
      'phone-call': undefined,
    };

    const handler = handlerMap[actionCode];
    if (!handler) {
      throw new BadRequestException('action code not yet supported');
    }

    return handler;
  }
}
