import { Module } from '@nestjs/common';
import { GatesController } from './controllers/gates.controller';
import { GatesService } from './services/gates.service';
import { MqttService } from './services/mqtt.service';

@Module({
  imports: [],
  controllers: [GatesController],
  providers: [GatesService, MqttService],
})
export class AppModule {}
