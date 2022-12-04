import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NodesModule } from './nodes/nodes.module';
import { NodesClientModule } from './nodes-client/nodes-client.module';
import { GatesModule } from './gates/gates.module';
import { UsersClientModule } from './users-client/users-client.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_DB_URI'),
      }),
    }),
    AuthModule,
    UsersModule,
    NodesModule,
    NodesClientModule,
    GatesModule,
    UsersClientModule,
    MqttModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
