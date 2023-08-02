import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersCrudService } from './services/users-crud.service';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { NodesModule } from 'src/nodes/nodes.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    NodesModule,
  ],
  providers: [UsersCrudService, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
