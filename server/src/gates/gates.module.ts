import { Module } from '@nestjs/common';
import { GatesService } from './services/gates.service';
import { GatesController } from './controllers/gates.controller';
import { MqttModule } from 'src/mqtt/mqtt.module';
import { NodesModule } from 'src/nodes/nodes.module';
import { UsersModule } from 'src/users/users.module';
import { TrackingService } from './services/tracking.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NodesModule, UsersModule, MqttModule, AuthModule, ConfigModule],
  providers: [GatesService, TrackingService],
  controllers: [GatesController],
})
export class GatesModule {}
