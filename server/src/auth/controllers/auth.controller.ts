import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginResponseDto } from '../dtos/responses/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }
}
