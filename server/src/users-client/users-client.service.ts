import { Injectable, BadRequestException } from '@nestjs/common';
import { ErrorCodes } from 'src/common';
import { UserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UsersClientService {
  constructor(private readonly usersService: UsersService) {}

  async getUser(userId: string): Promise<UserDto> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new BadRequestException({
        error_code: ErrorCodes.USER_NOT_FOUND,
        message: 'user not found'
      });
    }

    return user;
  }
}
