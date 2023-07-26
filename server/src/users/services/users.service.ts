import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dtos/responses';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../dtos/requests';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: CreateUserRequestDto): Promise<UserResponseDto> {
    const created = await this.userModel.create(user);
    return this.#mapFromSchema(created);
  }

  async findById(userId: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(userId);
    return this.#mapFromSchema(user);
  }

  async findByUsername(username: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ username });
    return this.#mapFromSchema(user);
  }

  async update(
    userId: string,
    fields: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const user = await this.userModel.findByIdAndUpdate(userId, fields);
    return this.#mapFromSchema(user);
  }

  async delete(userId: string): Promise<UserResponseDto> {
    const user = await this.userModel.findByIdAndDelete(userId);
    return this.#mapFromSchema(user);
  }

  #mapFromSchema(userDocument: UserDocument): UserResponseDto {
    if (!userDocument) {
      return null;
    }

    const dto: UserResponseDto = {
      id: userDocument._id.toHexString(),
      name: userDocument.name,
      last: userDocument.last,
      username: userDocument.username,
      access: userDocument.access,
      rootId: userDocument.rootId,
      roles: userDocument.roles,
    };

    return plainToInstance(UserResponseDto, dto);
  }
}
