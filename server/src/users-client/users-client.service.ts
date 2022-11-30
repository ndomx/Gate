import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UsersClientService {
  constructor(private readonly usersService: UsersService) {}

  async getUser(userId: string): Promise<UserDto> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new Error('user not found');
    }

    return user;
  }
}
