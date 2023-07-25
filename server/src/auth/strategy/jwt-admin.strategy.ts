import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ErrorCodes } from 'src/common/enum/error-codes.enum';
import { Role } from 'src/common/enum/role.enum';
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
    const user = await this.usersService.findOne(payload.sub)
    if (!user) {
      throw new ForbiddenException({
        error_code: ErrorCodes.ACCESS_DENIED,
        message: 'cannot find user in db',
      });
    }

    if (!user.roles?.includes(Role.ADMIN)) {
      throw new ForbiddenException({
        error_code: ErrorCodes.ACCESS_DENIED,
        message: 'admin credentials are needed for this operation',
      });
    }

    return { userId: payload.sub, username: payload.username };
  }
}
