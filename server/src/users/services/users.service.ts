import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../dtos/requests';
import { UserDocument, UserEntity } from '../entities/user.entity';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private readonly model: Model<UserDocument>,
  ) {}

  create(user: CreateUserRequestDto): Promise<User> {
    return this.model.create(user).then((u) => this.#mapFromSchema(u));
  }

  findById(id: string): Promise<User> {
    return this.model.findById(id).then((u) => this.#mapFromSchema(u));
  }

  update(id: string, fields: UpdateUserRequestDto): Promise<User> {
    return this.model
      .findByIdAndUpdate(id, fields, { returnDocument: 'after' })
      .then((u) => this.#mapFromSchema(u));
  }

  delete(id: string): Promise<User> {
    return this.model.findByIdAndDelete(id).then((u) => this.#mapFromSchema(u));
  }

  #mapFromSchema(document: UserDocument): User {
    if (!document) {
      throw new NotFoundException();
    }

    return {
      id: document._id.toHexString(),
      name: document.name,
      last: document.last,
      username: document.username,
      access: document.access,
      authId: document.authId,
    };
  }
}
