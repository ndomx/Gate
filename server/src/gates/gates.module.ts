import { Module } from '@nestjs/common';
import { NodesClientModule } from 'src/nodes-client/nodes-client.module';
import { UsersClientModule } from 'src/users-client/users-client.module';
import { GatesService } from './gates.service';
import { GatesController } from './gates.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { Transport } from '@nestjs/microservices/enums';

@Module({
  imports: [
    NodesClientModule,
    UsersClientModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'MQTT_BROKER_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: configService.get('MQTT_SERVER_URL'),
            port: configService.get('MQTT_SERVER_PORT'),
          },
        }),
      },
    ]),
  ],
  providers: [GatesService],
  controllers: [GatesController],
})
export class GatesModule {}
