import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NodesModule } from './nodes/nodes.module';
import { GatesModule } from './gates/gates.module';
import { MqttModule } from './mqtt/mqtt.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_DB_URI'),
      }),
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    NodesModule,
    GatesModule,
    MqttModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
