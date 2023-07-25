import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodesService } from './services/nodes.service';
import { Node, NodeSchema } from './schemas/node.schema';

@Module({
  providers: [NodesService],
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
  ],
  exports: [NodesService]
})
export class NodesModule {}
