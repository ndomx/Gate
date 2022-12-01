import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { ErrorCodes } from 'src/common';
import { NodeDto } from 'src/nodes/dtos/node.dto';
import { NodesService } from 'src/nodes/nodes.service';
import { CreateNodeRequestDto } from './dtos/create-node-request.dto';
import { UpdateNodeRequestDto } from './dtos/update-node-request.dto';

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

  async createNode(request: CreateNodeRequestDto): Promise<NodeDto> {
    const root = await this.nodesService.findOne(request.rootId);
    if (!root) {
      throw new BadRequestException({
        error_code: ErrorCodes.ROOT_NOT_FOUND,
        message: 'invalid root id',
      });
    }

    const path = this.#processPath(request.path);
    if (!path.startsWith(root.name)) {
      throw new BadRequestException({
        error_code: ErrorCodes.PATH_ERROR,
        message: 'inconsistent path with root id',
      });
    }

    const parent = await this.#getNodeFromPath(request.path);

    const node = this.nodesService.createOne({
      name: request.name,
      nodeInfo: request.nodeInfo,
      parent: parent.nodeId,
      rootId: request.rootId,
    });

    if (!node) {
      throw new InternalServerErrorException({
        error_code: ErrorCodes.DATABASE_ERROR,
        message: 'unable to save node to database',
      });
    }

    return node;
  }

  async getNodesByPrefix(prefix: string): Promise<NodeDto[]> {
    if(!prefix.match(/^([a-zA-Z0-9_-]+\/?)+$/)) {
      throw new BadRequestException({
        error_code: ErrorCodes.INVALID_REQUEST,
        message: 'path should match /^([a-zA-Z0-9_-]+\/?)+$/'
      })
    }

    const path = this.#processPath(prefix);
    const startNode = await this.#getNodeFromPath(path);
    return this.#findChildren(startNode);
  }

  async getChildren(nodeId: string): Promise<NodeDto[]> {
    if (!mongoose.isValidObjectId(nodeId)) {
      throw new BadRequestException({
        error_code: ErrorCodes.INVALID_REQUEST,
        message: 'node_id must be a valid mongo id'
      })
    }

    const startNode = await this.nodesService.findOne(nodeId);
    if (!startNode) {
      throw new BadRequestException({
        error_code: ErrorCodes.NODE_NOT_FOUND,
        message: 'node not found',
      });
    }

    return this.#findChildren(startNode);
  }

  async updateNode(
    nodeId: string,
    fields: UpdateNodeRequestDto,
  ): Promise<NodeDto> {
    if (fields.parent && fields.rootId) {
      const parent = await this.nodesService.findInRoot(
        fields.parent,
        fields.rootId,
      );
      if (!parent) {
        throw new BadRequestException({
          error_code: ErrorCodes.PATH_ERROR,
          message: 'parent is not a child of root',
        });
      }
    }

    const node = await this.nodesService.updateOne(nodeId, fields);
    if (!node) {
      throw new InternalServerErrorException({
        error_code: ErrorCodes.DATABASE_ERROR,
        message: 'unable to update node',
      });
    }

    return node;
  }

  async deleteNode(nodeId: string): Promise<NodeDto> {
    const node = await this.nodesService.deleteOne(nodeId);
    if (!node) {
      throw new InternalServerErrorException({
        error_code: ErrorCodes.DATABASE_ERROR,
        message: 'unable to delete node',
      });
    }

    return node;
  }

  #processPath(path: string): string {
    return path.trim().replace(/^\/+/, '').replace(/\/+$/, '');
  }

  async #getNodeFromPath(path: string): Promise<NodeDto> {
    const steps = this.#processPath(path).split('/');

    let next: NodeDto;
    let parent = '';

    for (const step in steps) {
      next = await this.nodesService.findByNameAndParent(parent, step);

      if (!next) {
        throw new BadRequestException({
          error_code: ErrorCodes.PATH_ERROR,
          message: 'invalid path',
        });
      }

      parent = next.nodeId;
    }

    return next;
  }

  async #findChildren(startNode: NodeDto): Promise<NodeDto[]> {
    let nodes = [startNode];

    const children = await this.nodesService.findChildren(startNode.nodeId);
    for (const child of children) {
      const childNodes = await this.#findChildren(child);
      nodes = nodes.concat(childNodes);
    }

    return nodes;
  }
}
