import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodesController } from './controllers/nodes.controller';
import { NodesService } from './services/nodes.service';
import { NodeEntity, NodeSchema } from './entities/node.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [NodesService],
  imports: [
    MongooseModule.forFeature([{ name: NodeEntity.name, schema: NodeSchema }]),
    ConfigModule,
  ],
  controllers: [NodesController],
  exports: [NodesService],
})
export class NodesModule {}
