import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatesController } from './controllers/gates.controller';
import { UsersController } from './controllers/users.controller';
import { Node, NodeSchema } from './schemas/node.shema';
import { User, UserSchema } from './schemas/user.schema';
import { GatesService } from './services/gates.service';
import { MqttService } from './services/mqtt.service';

@Module({
  providers: [GatesService, MqttService],
  controllers: [GatesController, UsersController],
  imports: [
    MongooseModule.forFeature([
      { name: Node.name, schema: NodeSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class GatesModule {}
