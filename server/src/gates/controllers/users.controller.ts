import { Controller, NotImplementedException } from '@nestjs/common';

@Controller('users')
export class UsersController {
  addUser() {
    throw new NotImplementedException();
  }

  getUser() {
    throw new NotImplementedException();
  }

  updateUser() {
    throw new NotImplementedException();
  }

  deleteUser() {
    throw new NotImplementedException();
  }
}
