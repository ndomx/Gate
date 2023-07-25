import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dtos/responses';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createOne(user: CreateUserDto): Promise<UserResponseDto> {
    const created = await this.userModel.create(user);
    return this.#mapFromSchema(created);
  }

  async findOne(userId: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(userId);
    return this.#mapFromSchema(user);
  }

  async findByUsername(username: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ username });
    return this.#mapFromSchema(user);
  }

  async updateOne(
    userId: string,
    fields: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userModel.findByIdAndUpdate(userId, fields);
    return this.#mapFromSchema(user);
  }

  async deleteOne(userId: string): Promise<UserResponseDto> {
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