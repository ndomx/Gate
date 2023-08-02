import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodesCrudService } from './services/nodes-crud.service';
import { Node, NodeSchema } from './schemas/node.schema';
import { NodesController } from './controllers/nodes.controller';
import { NodesService } from './services/nodes.service';

@Module({
  providers: [NodesCrudService, NodesService],
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
  ],
  controllers: [NodesController],
  exports: [NodesService],
})
export class NodesModule {}
