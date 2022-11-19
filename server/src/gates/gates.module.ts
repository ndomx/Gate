import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatesController } from './controllers/gates.controller';
import { NodesController } from './controllers/nodes.controller';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { Node, NodeSchema } from './schemas/node.shema';
import { User, UserSchema } from './schemas/user.schema';
import { GatesService } from './services/gates.service';
import { MqttService } from './services/mqtt.service';
import { NodesService } from './services/nodes.service';

@Module({
  providers: [GatesService, MqttService, NodesService],
  controllers: [GatesController, NodesController],
  imports: [
    MongooseModule.forFeature([
      { name: Node.name, schema: NodeSchema },
      { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
  ],
})
export class GatesModule {}
