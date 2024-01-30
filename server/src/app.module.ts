import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { NodesModule } from './nodes/nodes.module';
import { GatesModule } from './gates/gates.module';
import { MqttModule } from './mqtt/mqtt.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

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
    ScheduleModule.forRoot(),
    UsersModule,
    NodesModule,
    GatesModule,
    MqttModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
