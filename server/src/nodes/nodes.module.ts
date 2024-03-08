import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodesController } from './controllers/nodes.controller';
import { NodesService } from './services/nodes.service';
import { Node, NodeSchema } from './entities/node.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [NodesService],
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
    AuthModule,
  ],
  controllers: [NodesController],
  exports: [NodesService],
})
export class NodesModule {}
