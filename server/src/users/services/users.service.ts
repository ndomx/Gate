import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersCrudService } from './users-crud.service';
import { NodesCrudService } from 'src/nodes/services/nodes-crud.service';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../dtos/requests';
import { UserResponseDto } from '../dtos/responses';
import { ErrorCodes } from 'src/common/enum/error-codes.enum';
import { hashPassword } from 'src/utils/crypto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersCrudService: UsersCrudService,
    private readonly nodesService: NodesCrudService,
  ) {}

  async createUser(request: CreateUserRequestDto): Promise<UserResponseDto> {
    const root = await this.nodesService.findRoot(request.rootId);
    if (!root) {
      throw new BadRequestException({
        error_code: ErrorCodes.ROOT_NOT_FOUND,
        message: 'invalid root id',
      });
    }

    const hashedPassword = await hashPassword(request.password);
    return this.usersCrudService.create({
      ...request,
      password: hashedPassword,
    });
  }

  findUserById(userId: string): Promise<UserResponseDto> {
    return this.usersCrudService.findById(userId);
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
