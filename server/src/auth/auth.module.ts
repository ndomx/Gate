import { Module } from '@nestjs/common';
import { AdminApiKeyGuard } from './guards/admin-api-key.guard';
import { UsersApiKeyGuard } from './guards/users-api-key.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AdminApiKeyGuard, UsersApiKeyGuard, ConfigService],
  exports: [AdminApiKeyGuard, UsersApiKeyGuard, ConfigService],
})
export class AuthModule {}
