import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NodeDocument, Node } from '../entities/node.entity';
import { CreateNodeRequestDto, UpdateNodeRequestDto } from '../dtos/requests';
import { NodeActionCode } from 'src/common/types';
import { NodeDto } from '../dtos';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class NodesService {
  constructor(
    @InjectModel(Node.name) private readonly model: Model<NodeDocument>,
  ) {}

  create(node: CreateNodeRequestDto): Promise<NodeDto> {
    return this.model.create(node).then((n) => this.#mapFromEntity(n));
  }

  findById(id: string): Promise<NodeDto> {
    return this.model.findById(id).then((n) => this.#mapFromEntity(n));
  }

  update(id: string, fields: UpdateNodeRequestDto): Promise<NodeDto> {
    return this.model
      .findByIdAndUpdate(id, fields, {
        returnDocument: 'after',
      })
      .then((n) => this.#mapFromEntity(n));
  }

  delete(id: string): Promise<NodeDto> {
    return this.model.findByIdAndDelete(id).then((n) => this.#mapFromEntity(n));
  }

  #mapFromEntity(document: NodeDocument): NodeDto {
    if (!document) {
      throw new NotFoundException();
    }

    const dto: Required<NodeDto> = {
      id: document._id.toHexString(),
      name: document.name,
      displayName: document.displayName,
      actionCode: document.actionCode as NodeActionCode,
      deviceId: document.deviceId,
    };

    return plainToInstance(NodeDto, dto);
  }
}
