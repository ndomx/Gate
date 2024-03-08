import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../dtos/requests';
import { UserDocument, User } from '../entities/user.entity';
import { UserDto } from '../dtos';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  create(user: CreateUserRequestDto): Promise<UserDto> {
    return this.model.create(user).then((u) => this.#mapFromEntity(u));
  }

  findById(id: string): Promise<UserDto> {
    return this.model.findById(id).then((u) => this.#mapFromEntity(u));
  }

  findByAuthId(authId: string): Promise<UserDto> {
    return this.model.findOne({ authId }).then((u) => this.#mapFromEntity(u));
  }

  update(id: string, fields: UpdateUserRequestDto): Promise<UserDto> {
    return this.model
      .findByIdAndUpdate(id, fields, { returnDocument: 'after' })
      .then((u) => this.#mapFromEntity(u));
  }

  delete(id: string): Promise<UserDto> {
    return this.model.findByIdAndDelete(id).then((u) => this.#mapFromEntity(u));
  }

  #mapFromEntity(document: UserDocument): UserDto {
    if (!document) {
      throw new NotFoundException();
    }

    const dto: Required<UserDto> = {
      id: document._id.toHexString(),
      authId: document.authId,
      access: document.access,
    };

    return plainToInstance(UserDto, dto);
  }
}
