import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserWithPasswordResponseDto } from 'src/common/dtos/responses/user-with-password-response.dto';
import { UsersService } from 'src/users/services/users.service';
import { LoginResponseDto } from '../dtos/responses/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsernameWithPassword(username);

    if (bcrypt.compareSync(pass, user.password)) {
      const { password: _password, ...result } = user;
      return result;
    }

    return null;
  }

  login(user: UserWithPasswordResponseDto): Promise<LoginResponseDto> {
    const payload = { username: user.username, sub: user.id };
    return Promise.resolve({
      accessToken: this.jwtService.sign(payload),
    });
  }
}
