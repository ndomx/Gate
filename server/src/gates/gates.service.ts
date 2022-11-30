import { Injectable } from '@nestjs/common';
import { MqttService } from 'src/mqtt/mqtt.service';
import { NodesClientService } from 'src/nodes-client/nodes-client.service';
import { UsersClientService } from 'src/users-client/users-client.service';

@Injectable()
export class GatesService {
  constructor(
    private readonly nodesClientService: NodesClientService,
    private readonly usersClientService: UsersClientService,
    private readonly mqttService: MqttService,
  ) {}

  async requestAccess(deviceId: string, userId: string) {
    // verify user
    const user = await this.usersClientService.getUser(userId);

    // verify node
    const node = await this.nodesClientService.getNodeInRoot(
      deviceId,
      user.rootId,
    );

    // is device node
    if (!node.nodeInfo.isDevice) {
      throw new Error('abstract!');
    }

    // verify permission
    const path = await this.nodesClientService.getPathForNode(deviceId);
    const hasAccess = user.access.every((prefix) => path.startsWith(prefix));
    if (!hasAccess) {
      throw new Error('No access');
    }

    // grant access
    const topic = `${node.rootId}/${path}`;
    this.mqttService.activateDevice(topic, {
      action: 'on/off',
    });

    // response
    return { topic: path };
  }
}
