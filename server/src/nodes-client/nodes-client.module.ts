import { Module } from '@nestjs/common';
import { NodesModule } from 'src/nodes/nodes.module';
import { NodesClientService } from './nodes-client.service';

@Module({
  imports: [NodesModule],
  providers: [NodesClientService],
  exports: [NodesClientService],
})
export class NodesClientModule {}
