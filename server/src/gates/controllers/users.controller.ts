import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  addUser() {
    throw new NotImplementedException();
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
