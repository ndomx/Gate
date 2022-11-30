import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqttService } from './mqtt.service';

@Module({
  providers: [MqttService],
  imports: [ConfigModule],
  exports: [MqttService],
})
export class MqttModule {}
