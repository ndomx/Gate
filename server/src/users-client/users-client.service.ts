import { Injectable, BadRequestException } from '@nestjs/common';
import { ErrorCodes } from 'src/common';
import { NodesService } from 'src/nodes/nodes.service';
import { UserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';
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

    const user = await this.usersService.createOne(request);
    if (!user) {
      throw new BadRequestException({
        error_code: ErrorCodes.DATABASE_ERROR,
        message: 'unable to create user',
      });
    }

    return user;
  }

  async getUser(userId: string): Promise<UserDto> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new BadRequestException({
        error_code: ErrorCodes.USER_NOT_FOUND,
        message: 'user not found',
      });
    }

    return user;
  }

  async updateUser(
    userId: string,
    fields: UpdateUserRequestDto,
  ): Promise<UserDto> {
    const user = await this.usersService.updateOne(userId, fields);
    if (!user) {
      throw new BadRequestException({
        error_code: ErrorCodes.USER_NOT_FOUND,
        message: 'user not found',
      });
    }

    return user;
  }

  async deleteUser(userId: string): Promise<UserDto> {
    const user = await this.usersService.deleteOne(userId);
    if (!user) {
      throw new BadRequestException({
        error_code: ErrorCodes.USER_NOT_FOUND,
        message: 'user not found',
      });
    }

    return user;
  }
}
