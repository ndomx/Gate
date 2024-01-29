import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodesController } from './controllers/nodes.controller';
import { NodesService } from './services/nodes.service';
import { NodeSchema } from './entities/node.entity';

@Module({
  providers: [NodesService],
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
  ],
  controllers: [NodesController],
  exports: [NodesService],
})
export class NodesModule {}
