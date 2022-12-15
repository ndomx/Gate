import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { UsersClientService } from './users-client.service';
import { UsersClientController } from './users-client.controller';
import { NodesModule } from 'src/nodes/nodes.module';

@Module({
  imports: [UsersModule, NodesModule],
  providers: [UsersClientService],
  exports: [UsersClientService],
  controllers: [UsersClientController],
})
export class UsersClientModule {}
