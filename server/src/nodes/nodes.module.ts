import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodesCrudService } from './services/nodes-crud.service';
import { Node, NodeSchema } from './schemas/node.schema';

@Module({
  providers: [NodesCrudService],
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
  ],
  exports: [NodesCrudService]
})
export class NodesModule {}
