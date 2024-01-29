import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { MqttService } from 'src/mqtt/services/mqtt.service';
import { NodesService } from 'src/nodes/services/nodes.service';
import { UsersService } from 'src/users/services/users.service';
import { UserNodesResponseDto } from 'src/common/dtos/responses/user-nodes-response.dto';
import { plainToInstance } from 'class-transformer';
import { ActivateDeviceRequestDto } from '../dtos/requests/activate-device-request.dto';
import { NodeActionCode } from 'src/utils/types';
import { IActionable } from 'src/common/interfaces/actionable.interface';
import { ActionableHandlerDto } from 'src/common/dtos/commons/actionable-handler.dto';
import { ERROR_CODES } from 'src/common/constants';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandExecutionDto } from '../dtos/commons/command-execution.dto';
import { DeviceAckDto } from 'src/common/dtos/commons/device-ack.dto';
import { TrackingService } from './tracking.service';

@Injectable()
export class GatesService {
  constructor(
    private readonly mqttService: MqttService,
    private readonly nodesService: NodesService,
    private readonly trackingService: TrackingService,
    private readonly usersService: UsersService,
  ) {}

  async activateDevice(
    nodeId: string,
    request: ActivateDeviceRequestDto,
  ): Promise<void> {
    // verify user
    const user = await this.usersService.findById(request.userAuthId);

    // verify permission
    const hasAccess = user.access.find((id) => nodeId === id);
    if (!hasAccess) {
      throw new UnauthorizedException({ errorCode: ERROR_CODES.ACCESS_DENIED });
    }

    // find node
    const node = await this.nodesService.findById(nodeId);

    // get handler and params
    const handler = this.#mapActionToHandler(node.info.actionCode);
    const params: ActionableHandlerDto = {
      action: request.action,
      body: request.actionDetails,
      deviceId: node.deviceId,
    };

    // grant access
    await handler.activateDevice(node, params);
    this.trackingService.create(node.id, 10000);
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

  getCommandExecutionStatus(deviceId: string): CommandExecutionDto {
    const task = this.trackingService.get(deviceId);
    if (!task) {
      throw new BadRequestException();
    }

    if (!task.pending) {
      this.trackingService.delete(deviceId);
    }

    return task;
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

  @OnEvent('device.ack')
  onDeviceResponse({ deviceId, status }: DeviceAckDto) {
    this.trackingService.update(deviceId, status);
  }
}
