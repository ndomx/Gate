import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NodesModule } from './nodes/nodes.module';
import { NodesClientModule } from './nodes-client/nodes-client.module';
import { GatesModule } from './gates/gates.module';
import { UsersClientModule } from './users-client/users-client.module';
import { ClientsModule } from '@nestjs/microservices/module';
import { Transport } from '@nestjs/microservices/enums';

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
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'MQTT_BROKER_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: configService.get('MQTT_SERVER_URL'),
            port: configService.get('MQTT_SERVER_PORT')
          },
        }),
      },
    ]),
    AuthModule,
    UsersModule,
    NodesModule,
    NodesClientModule,
    GatesModule,
    UsersClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
