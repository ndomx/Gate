import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dtos/responses';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../dtos/requests';
import { ErrorCodes } from 'src/common/enum/error-codes.enum';

@Injectable()
export class UsersCrudService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: CreateUserRequestDto): Promise<UserResponseDto> {
    const created = await this.userModel.create(user);
    if (!created) {
      throw new InternalServerErrorException({
        errorCode: ErrorCodes.DATABASE_ERROR,
        message: 'could not create resource',
      });
    }

    return this.#mapFromSchema(created);
  }

  async findById(userId: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException({
        errorCode: ErrorCodes.USER_NOT_FOUND,
        message: 'could not find user',
      });
    }

    return this.#mapFromSchema(user);
  }

  async findByUsername(username: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException({
        errorCode: ErrorCodes.USER_NOT_FOUND,
        message: 'could not find user',
      });
    }

    return this.#mapFromSchema(user);
  }

  async update(
    userId: string,
    fields: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const user = await this.userModel.findByIdAndUpdate(userId, fields, {
      returnDocument: 'after',
    });

    if (!user) {
      throw new InternalServerErrorException({
        errorCode: ErrorCodes.DATABASE_ERROR,
        message: 'could not modify resource',
      });
    }

    return this.#mapFromSchema(user);
  }

  async delete(userId: string): Promise<UserResponseDto> {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException({
        errorCode: ErrorCodes.USER_NOT_FOUND,
        message: 'could not find user',
      });
    }

    return this.#mapFromSchema(user);
  }

  #mapFromSchema(userDocument: UserDocument): UserResponseDto {
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
