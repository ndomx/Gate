import { Injectable } from '@nestjs/common';
import { NodeDto } from 'src/nodes/dtos/node.dto';
import { NodesService } from 'src/nodes/nodes.service';

@Injectable()
export class NodesClientService {
  constructor(private readonly nodesService: NodesService) {}

  async getNodeInRoot(nodeId: string, rootId: string): Promise<NodeDto> {
    const node = await this.nodesService.findInRoot(nodeId, rootId);
    if (!node) {
      throw new Error('node not found');
    }

    return node;
  }

  async getPathForNode(nodeId: string): Promise<string> {
    let node = await this.nodesService.findOne(nodeId);
    const rootId = node.rootId;

    const nodes = [node.name];
    while (node.nodeId !== rootId) {
      node = await this.nodesService.findOne(node.nodeId);
      if (!node) {
        throw new Error('db error');
      }

      nodes.push(node.name);
    }

    return nodes.reverse().join('/');
  }
}
