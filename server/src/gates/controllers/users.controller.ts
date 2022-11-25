import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  Param,
  Query,
  NotImplementedException,
} from '@nestjs/common';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { CreateUserResponseDto } from '../dtos/response/create-user-response.dro';
import { UsersService } from '../services/users.service';

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(
    @Body() request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.createUser(request);
  }

  @Get()
  getUser() {
    throw new NotImplementedException();
  }

  @Patch()
  updateUser() {
    throw new NotImplementedException();
  }

  @Delete()
  deleteUser() {
    throw new NotImplementedException();
  }
}
