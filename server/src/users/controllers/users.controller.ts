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
import { UsersService } from '../services/users.service';
import { JwtAdminAuthGuard } from 'src/auth/guards/jwt-admin-auth.guard';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../dtos/requests';
import { UserResponseDto } from '../dtos/responses';

@Controller('users')
@UseGuards(JwtAdminAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() request: CreateUserRequestDto): Promise<UserResponseDto> {
    return this.usersService.createUser(request);
  }

  @Get(':id')
  findById(@Param('id') userId: string): Promise<UserResponseDto> {
    return this.usersService.findById(userId);
  }

  @Patch(':id')
  update(
    @Param('id') userId: string,
    @Body() fields: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateUser(userId, fields);
  }

  @Delete(':id')
  delete(@Param('id') userId: string): Promise<UserResponseDto> {
    return this.usersService.deleteUser(userId);
  }
}
