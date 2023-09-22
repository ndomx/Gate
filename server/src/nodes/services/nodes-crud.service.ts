import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Node, NodeDocument } from '../schemas/node.schema';
import { NodeResponseDto } from '../dtos/responses';
import { plainToInstance } from 'class-transformer';
import { CreateNodeRequestDto, UpdateNodeRequestDto } from '../dtos/requests';
import { NodeActionCode } from 'src/utils/types';
import { ERROR_CODES } from 'src/common/constants';

@Injectable()
export class NodesCrudService {
  constructor(
    @InjectModel(Node.name) private readonly nodeModel: Model<NodeDocument>,
  ) {}

  async create(node: CreateNodeRequestDto): Promise<NodeResponseDto> {
    const created = await this.nodeModel.create(node);
    if (!created) {
      throw new InternalServerErrorException({
        errorCode: ERROR_CODES.DATABASE_ERROR,
        message: 'could not create resource',
      });
    }

    return this.#mapFromSchema(created);
  }

  async findById(nodeId: string): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findById(nodeId);
    if (!node) {
      throw new NotFoundException({
        errorCode: ERROR_CODES.NODE_NOT_FOUND,
        message: 'could not find node',
      });
    }

    return this.#mapFromSchema(node);
  }

  async findInRoot(nodeId: string, rootId: string): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findOne({ _id: nodeId, rootId });
    if (!node) {
      throw new NotFoundException({
        errorCode: ERROR_CODES.NODE_NOT_FOUND,
        message: 'could not find node',
      });
    }

    return this.#mapFromSchema(node);
  }

  async findByNameAndParent(
    parentId: string,
    name: string,
  ): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findOne({ parentId, name });
    if (!node) {
      throw new NotFoundException({
        errorCode: ERROR_CODES.NODE_NOT_FOUND,
        message: 'could not find node',
      });
    }

    return this.#mapFromSchema(node);
  }

  async findByNameAndRoot(
    name: string,
    rootId: string,
  ): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findOne({ rootId, name });
    if (!node) {
      throw new NotFoundException({
        errorCode: ERROR_CODES.NODE_NOT_FOUND,
        message: 'could not find node',
      });
    }

    return this.#mapFromSchema(node);
  }

  async findChildren(nodeId: string): Promise<NodeResponseDto[]> {
    const nodes = await this.nodeModel.find({ parentId: nodeId });
    if (!nodes) {
      throw new InternalServerErrorException({
        errorCode: ERROR_CODES.NODE_NOT_FOUND,
        message: 'resource not found',
      });
    }

    return nodes.map((node) => this.#mapFromSchema(node));
  }

  async update(
    nodeId: string,
    fields: UpdateNodeRequestDto,
  ): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findByIdAndUpdate(nodeId, fields, {
      returnDocument: 'after',
    });

    if (!node) {
      throw new InternalServerErrorException({
        errorCode: ERROR_CODES.DATABASE_ERROR,
        message: 'could not modify resource',
      });
    }

    return this.#mapFromSchema(node);
  }

  async delete(nodeId: string): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findByIdAndDelete(nodeId);
    if (!node) {
      throw new NotFoundException({
        errorCode: ERROR_CODES.NODE_NOT_FOUND,
        message: 'could not find node',
      });
    }

    return this.#mapFromSchema(node);
  }

  #mapFromSchema(nodeDocument: NodeDocument): NodeResponseDto {
    const response: NodeResponseDto = {
      id: nodeDocument._id.toHexString(),
      name: nodeDocument.name,
      parentId: nodeDocument.parentId,
      rootId: nodeDocument.rootId,
      nodeInfo: {
        ...nodeDocument.nodeInfo,
        actionCode: nodeDocument.nodeInfo.actionCode as NodeActionCode,
      },
      displayName: nodeDocument.displayName,
    };

    return plainToInstance(NodeResponseDto, response);
  }
}
