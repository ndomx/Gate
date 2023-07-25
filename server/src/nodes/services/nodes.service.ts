import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNodeDto } from '../dtos/create-node.dto';
import { NodeDto } from '../dtos/node.dto';
import { UpdateNodeDto } from '../dtos/update-node.dto';
import { Node, NodeDocument } from '../schemas/node.schema';

@Injectable()
export class NodesService {
  constructor(
    @InjectModel(Node.name) private readonly nodeModel: Model<NodeDocument>,
  ) {}

  async createOne(node: CreateNodeDto): Promise<NodeDto> {
    const created = await this.nodeModel.create(node);
    return this.#mapFromSchema(created);
  }

  async findOne(nodeId: string): Promise<NodeDto> {
    const node = await this.nodeModel.findById(nodeId);
    return this.#mapFromSchema(node);
  }

  async findInRoot(nodeId: string, rootId: string): Promise<NodeDto> {
    const node = await this.nodeModel.findOne({ _id: nodeId, rootId });
    return this.#mapFromSchema(node);
  }

  async findByNameAndParent(parentId: string, name: string): Promise<NodeDto> {
    const node = await this.nodeModel.findOne({ parent: parentId, name });
    return this.#mapFromSchema(node);
  }

  async findChildren(nodeId: string): Promise<NodeDto[]> {
    const nodes = await this.nodeModel.find({ parent: nodeId });
    return nodes.map((node) => this.#mapFromSchema(node));
  }

  async findRoot(rootId: string): Promise<NodeDto> {
    const root = await this.nodeModel.findOne({ _id: rootId, parent: '' });
    return this.#mapFromSchema(root);
  }

  async updateOne(
    nodeId: string,
    updateFields: UpdateNodeDto,
  ): Promise<NodeDto> {
    const node = await this.nodeModel.findByIdAndUpdate(nodeId, updateFields);
    return this.#mapFromSchema(node);
  }

  async deleteOne(nodeId: string): Promise<NodeDto> {
    const node = await this.nodeModel.findByIdAndDelete(nodeId);
    return this.#mapFromSchema(node);
  }

  #mapFromSchema(nodeDocument: NodeDocument): NodeDto {
    if (!nodeDocument) {
      return null;
    }

    const node = new NodeDto();
    node.name = nodeDocument.name;
    node.parent = nodeDocument.parent;
    node.rootId = nodeDocument.rootId;
    node.nodeInfo = nodeDocument.nodeInfo;
    node.nodeId = nodeDocument._id.toHexString();

    if (nodeDocument.displayName) {
      node.displayName = nodeDocument.displayName;
    } else {
      node.displayName = nodeDocument.name;
    }

    return node;
  }
}
