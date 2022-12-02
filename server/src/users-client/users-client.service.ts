import { Injectable, BadRequestException } from '@nestjs/common';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { ErrorCodes } from 'src/common';
import { NodesService } from 'src/nodes/nodes.service';
import { UserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';
import { PublicUserDto } from './dtos/public-user.dto';
import { UpdateUserRequestDto } from './dtos/udpate-user-request.dto';

@Injectable()
export class UsersClientService {
  constructor(
    private readonly usersService: UsersService,
    private readonly nodesService: NodesService,
  ) {}

  async createUser(request: CreateUserRequestDto): Promise<UserDto> {
    const root = await this.nodesService.findRoot(request.rootId);
    if (!root) {
      throw new BadRequestException({
        error_code: ErrorCodes.ROOT_NOT_FOUND,
        message: 'invalid root id',
      });
    }

    // TODO: validate username

    const user = await this.usersService.createOne(request);
    if (!user) {
      throw new BadRequestException({
        error_code: ErrorCodes.DATABASE_ERROR,
        message: 'unable to create user',
      });
    }

    return user;
  }

  async getUser(userId: string): Promise<PublicUserDto> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new BadRequestException({
        error_code: ErrorCodes.USER_NOT_FOUND,
        message: 'user not found',
      });
    }

    return this.#removeFields(user);
  }

  async updateUser(
    userId: string,
    fields: UpdateUserRequestDto,
  ): Promise<PublicUserDto> {
    const user = await this.usersService.updateOne(userId, fields);
    if (!user) {
      throw new BadRequestException({
        error_code: ErrorCodes.USER_NOT_FOUND,
        message: 'user not found',
      });
    }

    return this.#removeFields(user);
  }

  async deleteUser(userId: string): Promise<PublicUserDto> {
    const user = await this.usersService.deleteOne(userId);
    if (!user) {
      throw new BadRequestException({
        error_code: ErrorCodes.USER_NOT_FOUND,
        message: 'user not found',
      });
    }

    return this.#removeFields(user);
  }

  #removeFields(user: UserDto): PublicUserDto {
    const plain = instanceToPlain<UserDto>(user);
    return plainToInstance(PublicUserDto, plain);
  }
}
