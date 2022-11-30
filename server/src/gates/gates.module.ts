import { Module } from '@nestjs/common';
import { NodesClientModule } from 'src/nodes-client/nodes-client.module';
import { UsersClientModule } from 'src/users-client/users-client.module';
import { GatesService } from './gates.service';
import { GatesController } from './gates.controller';

@Module({
  imports: [NodesClientModule, UsersClientModule],
  providers: [GatesService],
  controllers: [GatesController]
})
export class GatesModule {}
