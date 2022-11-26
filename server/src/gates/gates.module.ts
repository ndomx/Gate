import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatesController } from './controllers/gates.controller';
import { NodesController } from './controllers/nodes.controller';
import { UsersController } from './controllers/users.controller';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { Node, NodeSchema } from './schemas/node.shema';
import { Person, PersonSchema } from './schemas/person.schema';
import { User, UserSchema } from './schemas/user.schema';
import { GatesService } from './services/gates.service';
import { MqttService } from './services/mqtt.service';
import { NodesService } from './services/nodes.service';
import { UsersService } from './services/users.service';

@Module({
  providers: [GatesService, MqttService, NodesService, UsersService],
  controllers: [GatesController, NodesController, UsersController],
  imports: [
    MongooseModule.forFeature([
      { name: Node.name, schema: NodeSchema },
      { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: Person.name, schema: PersonSchema },
    ]),
  ],
})
export class GatesModule {}
