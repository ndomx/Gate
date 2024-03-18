import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  AddAccessRequestDto,
  CreateUserRequestDto,
  UpdateUserRequestDto,
} from '../dtos/requests';
import { UsersService } from '../services/users.service';
import { AdminApiKeyGuard } from 'src/auth/guards/admin-api-key.guard';
import { UserDto } from '../dtos';

@Controller('users')
@UseGuards(AdminApiKeyGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() request: CreateUserRequestDto): Promise<UserDto> {
    return this.usersService.create(request);
  }

  @Get(':id')
  findById(@Param('id') userId: string): Promise<UserDto> {
    return this.usersService.findById(userId);
  }

  @Patch(':id')
  update(
    @Param('id') userId: string,
    @Body() fields: UpdateUserRequestDto,
  ): Promise<UserDto> {
    return this.usersService.update(userId, fields);
  }

  @Delete(':id')
  delete(@Param('id') userId: string): Promise<UserDto> {
    return this.usersService.delete(userId);
  }

  @Patch(':id/add-access')
  addAccess(
    @Param('id') userId: string,
    @Body() request: AddAccessRequestDto,
  ): Promise<UserDto> {
    return this.usersService.addAccess(userId, request);
  }

  @Patch(':id/remove-access')
  removeAccess(
    @Param('id') userId: string,
    @Body() request: AddAccessRequestDto,
  ): Promise<UserDto> {
    return this.usersService.removeAccess(userId, request);
  }

  @Patch(':id/revoke-access')
  removeAllAccess(@Param('id') userId: string): Promise<UserDto> {
    return this.usersService.removeAllAccess(userId);
  }
}
