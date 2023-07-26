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
import { ErrorCodes } from 'src/common/enum/error-codes.enum';

@Injectable()
export class NodesCrudService {
  constructor(
    @InjectModel(Node.name) private readonly nodeModel: Model<NodeDocument>,
  ) {}

  async create(node: CreateNodeRequestDto): Promise<NodeResponseDto> {
    const created = await this.nodeModel.create(node);
    if (!created) {
      throw new InternalServerErrorException({
        errorCode: ErrorCodes.DATABASE_ERROR,
        message: 'could not create resource',
      });
    }

    return this.#mapFromSchema(created);
  }

  async findById(nodeId: string): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findById(nodeId);
    if (!node) {
      throw new NotFoundException({
        errorCode: ErrorCodes.NODE_NOT_FOUND,
        message: 'could not find node',
      });
    }

    return this.#mapFromSchema(node);
  }

  async findInRoot(nodeId: string, rootId: string): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findOne({ _id: nodeId, rootId });
    if (!node) {
      throw new NotFoundException({
        errorCode: ErrorCodes.NODE_NOT_FOUND,
        message: 'could not find node',
      });
    }

    return this.#mapFromSchema(node);
  }

  async findByNameAndParent(
    parentId: string,
    name: string,
  ): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findOne({ parent: parentId, name });
    if (!node) {
      throw new NotFoundException({
        errorCode: ErrorCodes.NODE_NOT_FOUND,
        message: 'could not find node',
      });
    }

    return this.#mapFromSchema(node);
  }

  async findChildren(nodeId: string): Promise<NodeResponseDto[]> {
    const nodes = await this.nodeModel.find({ parent: nodeId });
    if (!nodes) {
      throw new InternalServerErrorException({
        errorCode: ErrorCodes.NODE_NOT_FOUND,
        message: 'resource not found',
      });
    }

    return nodes.map((node) => this.#mapFromSchema(node));
  }

  async findRoot(rootId: string): Promise<NodeResponseDto> {
    const root = await this.nodeModel.findOne({ _id: rootId, parent: '' });
    if (!root) {
      throw new NotFoundException({
        errorCode: ErrorCodes.ROOT_NOT_FOUND,
        message: 'could not find root',
      });
    }

    return this.#mapFromSchema(root);
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
        errorCode: ErrorCodes.DATABASE_ERROR,
        message: 'could not modify resource',
      });
    }

    return this.#mapFromSchema(node);
  }

  async delete(nodeId: string): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findByIdAndDelete(nodeId);
    if (!node) {
      throw new NotFoundException({
        errorCode: ErrorCodes.NODE_NOT_FOUND,
        message: 'could not find node',
      });
    }

    return this.#mapFromSchema(node);
  }

  #mapFromSchema(nodeDocument: NodeDocument): NodeResponseDto {
    const response: NodeResponseDto = {
      id: nodeDocument._id.toHexString(),
      name: nodeDocument.name,
      parent: nodeDocument.parent,
      rootId: nodeDocument.rootId,
      nodeInfo: nodeDocument.nodeInfo,
      displayName: nodeDocument.displayName,
    };

    return plainToInstance(NodeResponseDto, response);
  }
}
