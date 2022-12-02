import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UserDto } from 'src/users/dtos/user.dto';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';
import { UpdateUserRequestDto } from './dtos/udpate-user-request.dto';
import { UsersClientService } from './users-client.service';

@Controller('users-client')
export class UsersClientController {
  constructor(private readonly usersClientService: UsersClientService) {}

  @Post()
  create(@Body() request: CreateUserRequestDto): Promise<UserDto> {
    return this.usersClientService.createUser(request);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<UserDto> {
    return this.usersClientService.getUser(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() fields: UpdateUserRequestDto,
  ): Promise<UserDto> {
    return this.usersClientService.updateUser(userId, fields);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string): Promise<UserDto> {
    return this.usersClientService.deleteUser(userId);
  }
}
