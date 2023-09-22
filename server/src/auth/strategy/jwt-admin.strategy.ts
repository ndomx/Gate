import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ERROR_CODES } from 'src/common/constants';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new ForbiddenException({
        errorCode: ERROR_CODES.ACCESS_DENIED,
        message: 'cannot find user in db',
      });
    }

    if (!user.roles?.includes('admin')) {
      throw new ForbiddenException({
        errorCode: ERROR_CODES.ACCESS_DENIED,
        message: 'admin credentials are needed for this operation',
      });
    }

    return { userId: payload.sub, username: payload.username };
  }
}
