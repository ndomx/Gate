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
import { IActionable } from 'src/common/interfaces/actionable.interface';
import { ActionableHandlerDto } from 'src/common/dtos/commons/actionable-handler.dto';
import { ERROR_CODES } from 'src/common/constants';
import { OnEvent } from '@nestjs/event-emitter';
import { DeviceAckDto } from 'src/common/dtos/commons/device-ack.dto';
import { TrackingService } from './tracking.service';
import { CommandExecutionDto } from '../dtos';
import { NodeActionCode } from 'src/common/types';

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
    const user = await this.usersService.findById(request.userId);

    // verify permission
    const hasAccess = user.access.find((id) => nodeId === id);
    if (!hasAccess) {
      throw new UnauthorizedException({ errorCode: ERROR_CODES.ACCESS_DENIED });
    }

    // find node
    const node = await this.nodesService.findById(nodeId);

    // get handler and params
    const handler = this.#mapActionToHandler(node.actionCode);
    const params: ActionableHandlerDto = {
      action: request.action,
      body: request.actionDetails,
      deviceId: node.deviceId,
    };

    // grant access
    await handler.activateDevice(node, params);
    this.trackingService.create(node.id, 10000);
  }

  async findUserNodes(userId: string): Promise<UserNodesResponseDto> {
    const user = await this.usersService.findById(userId);
    const nodes = await Promise.all(
      user.access.map((nodeId) => this.nodesService.findById(nodeId)),
    );

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
