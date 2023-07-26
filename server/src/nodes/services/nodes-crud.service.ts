import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Node, NodeDocument } from '../schemas/node.schema';
import { NodeResponseDto } from '../dtos/responses';
import { plainToInstance } from 'class-transformer';
import { CreateNodeRequestDto, UpdateNodeRequestDto } from '../dtos/requests';

@Injectable()
export class NodesCrudService {
  constructor(
    @InjectModel(Node.name) private readonly nodeModel: Model<NodeDocument>,
  ) {}

  async create(node: CreateNodeRequestDto): Promise<NodeResponseDto> {
    const created = await this.nodeModel.create(node);
    return this.#mapFromSchema(created);
  }

  async findById(nodeId: string): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findById(nodeId);
    return this.#mapFromSchema(node);
  }

  async findInRoot(nodeId: string, rootId: string): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findOne({ _id: nodeId, rootId });
    return this.#mapFromSchema(node);
  }

  async findByNameAndParent(
    parentId: string,
    name: string,
  ): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findOne({ parent: parentId, name });
    return this.#mapFromSchema(node);
  }

  async findChildren(nodeId: string): Promise<NodeResponseDto[]> {
    const nodes = await this.nodeModel.find({ parent: nodeId });
    return nodes.map((node) => this.#mapFromSchema(node));
  }

  async findRoot(rootId: string): Promise<NodeResponseDto> {
    const root = await this.nodeModel.findOne({ _id: rootId, parent: '' });
    return this.#mapFromSchema(root);
  }

  async update(
    nodeId: string,
    updateFields: UpdateNodeRequestDto,
  ): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findByIdAndUpdate(nodeId, updateFields);
    return this.#mapFromSchema(node);
  }

  async delete(nodeId: string): Promise<NodeResponseDto> {
    const node = await this.nodeModel.findByIdAndDelete(nodeId);
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
