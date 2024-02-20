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
import { CreateUserRequestDto, UpdateUserRequestDto } from '../dtos/requests';
import { User } from '../interfaces/user.interface';
import { UsersService } from '../services/users.service';
import { AdminApiKeyGuard } from 'src/auth/guards/admin-api-key.guard';

@Controller('users')
@UseGuards(AdminApiKeyGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() request: CreateUserRequestDto): Promise<User> {
    return this.usersService.create(request);
  }

  @Get(':id')
  findById(@Param('id') userId: string): Promise<User> {
    return this.usersService.findById(userId);
  }

  @Patch(':id')
  update(
    @Param('id') userId: string,
    @Body() fields: UpdateUserRequestDto,
  ): Promise<User> {
    return this.usersService.update(userId, fields);
  }

  @Delete(':id')
  delete(@Param('id') userId: string): Promise<User> {
    return this.usersService.delete(userId);
  }
}
