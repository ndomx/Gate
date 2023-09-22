import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodesCrudService } from './services/nodes-crud.service';
import { Node, NodeSchema } from './schemas/node.schema';
import { NodesController } from './controllers/nodes.controller';
import { NodesService } from './services/nodes.service';
import { RootsController } from './controllers/roots.controller';
import { RootsCrudService } from './services/roots-crud.service';
import { Root, RootSchema } from './schemas/root.schema';

@Module({
  providers: [NodesCrudService, NodesService, RootsCrudService],
  imports: [
    MongooseModule.forFeature([
      { name: Node.name, schema: NodeSchema },
      { name: Root.name, schema: RootSchema },
    ]),
  ],
  controllers: [NodesController, RootsController],
  exports: [NodesService],
})
export class NodesModule {}
