import { NodesCrudService } from './nodes-crud.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NodeResponseDto } from '../dtos/responses';
import { ErrorCodes } from 'src/common/enum/error-codes.enum';
import { CreateNodeRequestDto, UpdateNodeRequestDto } from '../dtos/requests';
import { NodeDto } from '../dtos/node.dto';

@Injectable()
export class NodesService {
  constructor(private readonly nodesCrudService: NodesCrudService) {}

  findInRoot(nodeId: string, rootId: string): Promise<NodeResponseDto> {
    return this.nodesCrudService.findInRoot(nodeId, rootId);
  }

  findRoot(nodeId: string): Promise<NodeResponseDto> {
    return this.nodesCrudService.findRoot(nodeId);
  }

  async getPathById(nodeId: string): Promise<string> {
    let node = await this.nodesCrudService.findById(nodeId);
    const rootId = node.rootId;

    const nodes = [node.name];
    while (node.id !== rootId) {
      node = await this.nodesCrudService.findById(node.parent);
      if (!node) {
        throw new InternalServerErrorException({
          errorCode: ErrorCodes.DATABASE_ERROR,
        });
      }

      nodes.push(node.name);
    }

    return nodes.reverse().join('/');
  }

  async create(request: CreateNodeRequestDto): Promise<NodeResponseDto> {
    const root = await this.nodesCrudService.findById(request.rootId);
    const _parent = await this.nodesCrudService.findInRoot(
      root.id,
      request.parent,
    );

    return this.nodesCrudService.create(request);
  }

  async findByPrefix(prefix: string): Promise<NodeResponseDto[]> {
    if (!prefix.match(/^\/?([-\w]+\/?)*$/)) {
      throw new BadRequestException({
        errorCode: ErrorCodes.INVALID_REQUEST,
        message: 'path should match /^\\/?([-w]+\\/?)*$/',
      });
    }

    const path = this.#processPath(prefix);
    const startNode = await this.#findNodeFromPath(path);

    return this.#findChildren(startNode);
  }

  async findChildrenById(nodeId: string): Promise<NodeResponseDto[]> {
    const startNode = await this.nodesCrudService.findById(nodeId);
    return this.#findChildren(startNode);
  }

  async update(
    nodeId: string,
    fields: UpdateNodeRequestDto,
  ): Promise<NodeResponseDto> {
    if (fields.parent && fields.rootId) {
      const _parent = await this.nodesCrudService.findInRoot(
        fields.parent,
        fields.rootId,
      );
    }

    return this.nodesCrudService.update(nodeId, fields);
  }

  delete(nodeId: string): Promise<NodeResponseDto> {
    return this.nodesCrudService.delete(nodeId);
  }

  #processPath(path: string): string {
    return path.trim().replace(/^\/+/, '').replace(/\/+$/, '');
  }

  async #findNodeFromPath(path: string): Promise<NodeResponseDto> {
    const nodeNames = this.#processPath(path).split('/');
    if (nodeNames.length <= 1) {
      throw new BadRequestException({
        errorCode: ErrorCodes.PATH_ERROR,
        message: 'invalid path',
      });
    }

    let next: NodeResponseDto;
    let parentId = '';

    for (const nodeName of nodeNames) {
      next = await this.nodesCrudService.findByNameAndParent(
        parentId,
        nodeName,
      );

      if (!next) {
        throw new BadRequestException({
          errorCode: ErrorCodes.PATH_ERROR,
          message: 'invalid path',
        });
      }

      parentId = next.id;
    }

    return next;
  }

  async #findChildren(startNode: NodeDto): Promise<NodeResponseDto[]> {
    let nodes = [startNode];

    const children = await this.nodesCrudService.findChildren(startNode.id);
    for (const child of children) {
      const childNodes = await this.#findChildren(child);
      nodes = nodes.concat(childNodes);
    }

    return nodes;
  }
}
