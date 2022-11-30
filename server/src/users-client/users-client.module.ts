import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UsersClientService } from './users-client.service';

@Module({
  imports: [UsersModule],
  providers: [UsersClientService],
  exports: [UsersClientService],
})
export class UsersClientModule {}
