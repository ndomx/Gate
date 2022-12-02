import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createOne(user: CreateUserDto): Promise<UserDto> {
    const created = await this.userModel.create(user);
    return this.#mapFromSchema(created);
  }

  async findOne(userId: string): Promise<UserDto> {
    const user = await this.userModel.findById(userId);
    return this.#mapFromSchema(user);
  }

  async findByUsername(username: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ username });
    return this.#mapFromSchema(user);
  }

  async updateOne(userId: string, fields: UpdateUserDto): Promise<UserDto> {
    const user = await this.userModel.findByIdAndUpdate(userId, fields);
    return this.#mapFromSchema(user);
  }

  async deleteOne(userId: string): Promise<UserDto> {
    const user = await this.userModel.findByIdAndDelete(userId);
    return this.#mapFromSchema(user);
  }

  #mapFromSchema(userDocument: UserDocument): UserDto {
    if (!userDocument) {
      return null;
    }

    const user = new UserDto();
    user.name = userDocument.name;
    user.last = userDocument.last;
    user.username = userDocument.username;
    user.password = userDocument.password;
    user.access = userDocument.access;
    user.rootId = userDocument.rootId;
    user.userId = userDocument._id.toHexString();

    return user;
  }
}
