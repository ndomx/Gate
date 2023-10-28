import { Module } from '@nestjs/common';
import { GatesService } from './services/gates.service';
import { GatesController } from './controllers/gates.controller';
import { MqttModule } from 'src/mqtt/mqtt.module';
import { NodesModule } from 'src/nodes/nodes.module';
import { UsersModule } from 'src/users/users.module';
import { TrackingService } from './services/tracking.service';

@Module({
  imports: [NodesModule, UsersModule, MqttModule],
  providers: [GatesService, TrackingService],
  controllers: [GatesController],
})
export class GatesModule {}
