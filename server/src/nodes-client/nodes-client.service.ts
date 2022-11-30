import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ErrorCodes } from 'src/common';
import { NodeDto } from 'src/nodes/dtos/node.dto';
import { NodesService } from 'src/nodes/nodes.service';

@Injectable()
export class NodesClientService {
  constructor(private readonly nodesService: NodesService) {}

  async getNodeInRoot(nodeId: string, rootId: string): Promise<NodeDto> {
    const node = await this.nodesService.findInRoot(nodeId, rootId);
    if (!node) {
      throw new BadRequestException({
        error_code: ErrorCodes.DEVICE_NOT_FOUND,
        message: 'could not find the requested node in users root',
      });
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
        throw new InternalServerErrorException({
          error_code: ErrorCodes.DATABASE_ERROR,
        });
      }

      nodes.push(node.name);
    }

    return nodes.reverse().join('/');
  }
}
