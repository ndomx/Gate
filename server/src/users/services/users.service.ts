import { UsersCrudService } from './users-crud.service';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../dtos/requests';
import { UserResponseDto } from '../dtos/responses';
import { hashPassword } from 'src/utils/crypto';
import { NodesService } from 'src/nodes/services/nodes.service';
import { Injectable } from '@nestjs/common';
import { UserWithPasswordResponseDto } from 'src/common/dtos/responses/user-with-password-response.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersCrudService: UsersCrudService,
    private readonly nodesService: NodesService,
  ) {}

  async createUser(request: CreateUserRequestDto): Promise<UserResponseDto> {
    const _root = await this.nodesService.findRoot(request.rootId);
    const hashedPassword = await hashPassword(request.password);
    return this.usersCrudService.create({
      ...request,
      password: hashedPassword,
    });
  }

  findById(userId: string): Promise<UserResponseDto> {
    return this.usersCrudService.findById(userId);
  }

  findByUsernameWithPassword(
    username: string,
  ): Promise<UserWithPasswordResponseDto> {
    return this.usersCrudService.findByUsernameWithPassword(username);
  }

  async updateUser(
    userId: string,
    fields: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    if (fields.password) {
      fields.password = await hashPassword(fields.password);
    }

    return this.usersCrudService.update(userId, fields);
  }

  deleteUser(userId: string): Promise<UserResponseDto> {
    return this.usersCrudService.delete(userId);
  }
}
