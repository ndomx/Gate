import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddUserRequestDto } from '../dtos/request/add-user-request.dto';
import { UpdateUserRequestDto } from '../dtos/request/update-user-request.dto';
import { AddUserResponseDto } from '../dtos/response/add-user-response.dto';
import { DeleteUserResponseDto } from '../dtos/response/delete-user-response.dto';
import { GetUserResponseDto } from '../dtos/response/get-user-response.dto';
import { UpdateUserResponseDto } from '../dtos/response/update-user-response.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  addUser(@Body() userData: AddUserRequestDto): Promise<AddUserResponseDto> {
    return this.usersService.addUser(userData);
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string): Promise<GetUserResponseDto> {
    return this.usersService.getUserById(userId);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() userData: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    return this.usersService.updateUser(userId, userData);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string): Promise<DeleteUserResponseDto> {
    return this.usersService.deleteUser(userId);
  }
}
