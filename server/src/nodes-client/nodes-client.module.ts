import { Module } from '@nestjs/common';
import { NodesModule } from 'src/nodes/nodes.module';
import { NodesClientService } from './nodes-client.service';
import { NodesClientController } from './nodes-client.controller';

@Module({
  imports: [NodesModule],
  providers: [NodesClientService],
  exports: [NodesClientService],
  controllers: [NodesClientController],
})
export class NodesClientModule {}
