import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NodeDocument } from '../entities/node.entity';
import { Node } from '../interfaces/node.interface';
import { CreateNodeRequestDto, UpdateNodeRequestDto } from '../dtos/requests';
import { NodeActionCode } from 'src/utils/types';

@Injectable()
export class NodesService {
  constructor(
    @InjectModel(Node.name) private readonly model: Model<NodeDocument>,
  ) {}

  create(node: CreateNodeRequestDto): Promise<Node> {
    return this.model.create(node).then((n) => this.#mapFromSchema(n));
  }

  findById(id: string): Promise<Node> {
    return this.model.findById(id).then((n) => this.#mapFromSchema(n));
  }

  update(id: string, fields: UpdateNodeRequestDto): Promise<Node> {
    return this.model
      .findByIdAndUpdate(id, fields, {
        returnDocument: 'after',
      })
      .then((n) => this.#mapFromSchema(n));
  }

  delete(id: string): Promise<Node> {
    return this.model.findByIdAndDelete(id).then((n) => this.#mapFromSchema(n));
  }

  #mapFromSchema(document: NodeDocument): Node {
    if (!document) {
      throw new NotFoundException();
    }

    return {
      id: document._id.toHexString(),
      name: document.name,
      displayName: document.displayName,
      actionCode: document.actionCode as NodeActionCode,
      deviceId: document.deviceId,
    };
  }
}
