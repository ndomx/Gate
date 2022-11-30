import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { UsersClientService } from './users-client.service';

@Module({
  imports: [UsersModule],
  providers: [UsersClientService],
  exports: [UsersClientService],
})
export class UsersClientModule {}
