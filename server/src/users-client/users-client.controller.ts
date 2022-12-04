import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAdminAuthGuard } from 'src/auth/guards/jwt-admin-auth.guard';
import { UserDto } from 'src/users/dtos/user.dto';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';
import { PublicUserDto } from './dtos/public-user.dto';
import { UpdateUserRequestDto } from './dtos/udpate-user-request.dto';
import { UsersClientService } from './users-client.service';

@Controller('users-client')
@UseGuards(JwtAdminAuthGuard)
export class UsersClientController {
  constructor(private readonly usersClientService: UsersClientService) {}

  @Post()
  create(@Body() request: CreateUserRequestDto): Promise<UserDto> {
    return this.usersClientService.createUser(request);
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<PublicUserDto> {
    return this.usersClientService.getUser(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() fields: UpdateUserRequestDto,
  ): Promise<PublicUserDto> {
    return this.usersClientService.updateUser(userId, fields);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string): Promise<PublicUserDto> {
    return this.usersClientService.deleteUser(userId);
  }
}
