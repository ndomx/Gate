import { Controller, Request, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
