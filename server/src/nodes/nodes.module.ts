import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodesCrudService } from './services/nodes-crud.service';
import { Node, NodeSchema } from './schemas/node.schema';
import { NodesController } from './controllers/nodes.controller';
import { NodesPublicController } from './controllers/nodes-public.controller';
import { NodesService } from './services/nodes.service';

@Module({
  providers: [NodesCrudService, NodesService],
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
  ],
  controllers: [NodesController, NodesPublicController],
  exports: [NodesCrudService, NodesService],
})
export class NodesModule {}
