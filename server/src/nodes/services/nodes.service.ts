import { NodesCrudService } from './nodes-crud.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { NodeResponseDto, RootResponseDto } from '../dtos/responses';
import { CreateNodeRequestDto, UpdateNodeRequestDto } from '../dtos/requests';
import { NodeDto } from '../dtos/node.dto';
import { RootsCrudService } from './roots-crud.service';
import { ERROR_CODES } from 'src/common/constants';

@Injectable()
export class NodesService {
  constructor(
    private readonly nodesCrudService: NodesCrudService,
    private readonly rootsCrudService: RootsCrudService,
  ) {}

  findInRoot(nodeId: string, rootId: string): Promise<NodeResponseDto> {
    return this.nodesCrudService.findInRoot(nodeId, rootId);
  }

  findRoot(rootId: string): Promise<RootResponseDto> {
    return this.rootsCrudService.findById(rootId);
  }

  async getPathById(nodeId: string): Promise<string> {
    let node = await this.nodesCrudService.findById(nodeId);
    const rootId = node.rootId;

    const nodes = [node.name];
    while (node.parentId !== rootId) {
      node = await this.nodesCrudService.findById(node.parentId);
      nodes.push(node.name);
    }

    return nodes.reverse().join('/');
  }

  async create(request: CreateNodeRequestDto): Promise<NodeResponseDto> {
    const root = await this.rootsCrudService.findById(request.rootId);

    let parentId = root.id;
    if (request.parentId) {
      const parent = await this.nodesCrudService.findInRoot(
        request.parentId,
        root.id,
      );

      parentId = parent.id;
    }

    return this.nodesCrudService.create({ ...request, parentId });
  }

  async findByPrefix(
    prefix: string,
    rootId: string,
  ): Promise<NodeResponseDto[]> {
    if (!prefix.match(/^\/?([-\w]+\/?)*$/)) {
      throw new BadRequestException({
        errorCode: ERROR_CODES.INVALID_REQUEST,
        message: 'path should match /^\\/?([-w]+\\/?)*$/',
      });
    }

    const path = this.#processPath(prefix);
    const startNode = await this.#findNodeFromPath(path, rootId);

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
    if (fields.parentId && fields.rootId) {
      const _parent = await this.nodesCrudService.findInRoot(
        fields.parentId,
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

  async #findNodeFromPath(
    path: string,
    rootId: string,
  ): Promise<NodeResponseDto> {
    const nodeNames = this.#processPath(path).split('/');
    if (nodeNames.length < 1) {
      throw new BadRequestException({
        errorCode: ERROR_CODES.PATH_ERROR,
        message: 'invalid path',
      });
    }

    let next: NodeResponseDto;
    let parentId = rootId;

    for (const nodeName of nodeNames) {
      next = await this.nodesCrudService.findByNameAndParent(
        parentId,
        nodeName,
      );

      if (!next) {
        throw new BadRequestException({
          errorCode: ERROR_CODES.PATH_ERROR,
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
