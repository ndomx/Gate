import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { ErrorCodes } from 'src/common/error-codes.enum';
import { NodeDto } from 'src/nodes/dtos/node.dto';
import { NodesService } from 'src/nodes/nodes.service';
import { UsersService } from 'src/users/users.service';
import { CreateNodeRequestDto } from './dtos/create-node-request.dto';
import { GetNodesResponseDto } from './dtos/get-nodes-response.dto';
import { UpdateNodeRequestDto } from './dtos/update-node-request.dto';
import { UserNodesResponseDto } from './dtos/user-nodes-response.dto';

@Injectable()
export class NodesClientService {
  constructor(
    private readonly nodesService: NodesService,
    private readonly usersService: UsersService,
  ) {}

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
      node = await this.nodesService.findOne(node.parent);
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

  async getNodesByPrefix(prefix: string): Promise<GetNodesResponseDto> {
    if (!prefix.match(/^([a-zA-Z0-9_-]+\/?)+$/)) {
      throw new BadRequestException({
        error_code: ErrorCodes.INVALID_REQUEST,
        message: 'path should match /^([a-zA-Z0-9_-]+/?)+$/',
      });
    }

    const path = this.#processPath(prefix);
    const startNode = await this.#getNodeFromPath(path);

    const response = new GetNodesResponseDto();
    response.nodes = await this.#findChildren(startNode);

    return response;
  }

  async getChildren(nodeId: string): Promise<GetNodesResponseDto> {
    if (!mongoose.isValidObjectId(nodeId)) {
      throw new BadRequestException({
        error_code: ErrorCodes.INVALID_REQUEST,
        message: 'node_id must be a valid mongo id',
      });
    }

    const startNode = await this.nodesService.findOne(nodeId);
    if (!startNode) {
      throw new BadRequestException({
        error_code: ErrorCodes.NODE_NOT_FOUND,
        message: 'node not found',
      });
    }

    const response = new GetNodesResponseDto();
    response.nodes = await this.#findChildren(startNode);

    return response;
  }

  async getUserNodes(
    userId: string,
    deviceOnly: boolean = true,
  ): Promise<UserNodesResponseDto> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new BadRequestException({
        error_code: ErrorCodes.USER_NOT_FOUND,
        message: 'user not found',
      });
    }

    const response = new UserNodesResponseDto();
    response.user = user;
    response.nodes = [];

    for (const prefix of user.access) {
      const children = await this.getNodesByPrefix(prefix);
      const nodes = deviceOnly
        ? children.nodes.filter((node) => node.nodeInfo.isDevice)
        : children.nodes;
        
      response.nodes.push(...nodes);
    }

    return response;
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

    for (const step of steps) {
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
