import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Root, RootDocument } from '../schemas/root.schema';
import { RootResponseDto } from '../dtos/responses';
import { plainToInstance } from 'class-transformer';
import { CreateRootRequestDto } from '../dtos/requests';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorCodes } from 'src/common/enum/error-codes.enum';
import { UpdateRootRequestDto } from '../dtos/requests/update-root-request.dto';

export class RootsCrudService {
  constructor(
    @InjectModel(Root.name) private readonly rootModel: Model<RootDocument>,
  ) {}

  async create(root: CreateRootRequestDto): Promise<RootResponseDto> {
    const created = await this.rootModel.create(root);

    if (!created) {
      throw new InternalServerErrorException({
        errorCode: ErrorCodes.DATABASE_ERROR,
        message: 'could not create resource',
      });
    }

    return this.#mapFromSchema(created);
  }

  async findById(rootId: string): Promise<RootResponseDto> {
    const root = await this.rootModel.findById(rootId);
    if (!root) {
      throw new NotFoundException({
        errorCode: ErrorCodes.ROOT_NOT_FOUND,
        message: 'could not find root',
      });
    }

    return this.#mapFromSchema(root);
  }

  async update(
    rootId: string,
    fields: UpdateRootRequestDto,
  ): Promise<RootResponseDto> {
    const root = await this.rootModel.findByIdAndUpdate(rootId, fields, {
      returnDocument: 'after',
    });

    if (!root) {
      throw new InternalServerErrorException({
        errorCode: ErrorCodes.DATABASE_ERROR,
        message: 'could not modify resource',
      });
    }

    return this.#mapFromSchema(root);
  }

  async delete(rootId: string): Promise<RootResponseDto> {
    const root = await this.rootModel.findByIdAndDelete(rootId);
    if (!root) {
      throw new NotFoundException({
        errorCode: ErrorCodes.ROOT_NOT_FOUND,
        message: 'could not find root',
      });
    }

    return this.#mapFromSchema(root);
  }

  #mapFromSchema(document: RootDocument): RootResponseDto {
    const dto: RootResponseDto = {
      id: document._id.toHexString(),
      name: document.name,
    };

    return plainToInstance(RootResponseDto, dto);
  }
}
