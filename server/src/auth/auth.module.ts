import { Module } from '@nestjs/common';
import { AdminApiKeyGuard } from './guards/admin-api-key.guard';
import { UsersApiKeyGuard } from './guards/users-api-key.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AdminApiKeyGuard, UsersApiKeyGuard],
})
export class AuthModule {}
