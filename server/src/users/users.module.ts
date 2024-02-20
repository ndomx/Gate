import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NodesModule } from 'src/nodes/nodes.module';
import { UsersController } from './controllers/users.controller';
import { UserEntity, UserSchema } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    NodesModule,
    ConfigModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
