import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('login')
export class LoginController {
  @UseGuards(LocalAuthGuard)
  @Post()
  async register(@Request() req) {
    return req.user;
  }
}
