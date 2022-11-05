import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatesController } from './controllers/gates.controller';
import { Gate, GateSchema } from './schemas/gate.schema';
import { GatesService } from './services/gates.service';
import { MqttService } from './services/mqtt.service';

@Module({
  providers: [GatesService, MqttService],
  controllers: [GatesController],
  imports: [
    MongooseModule.forFeature([{ name: Gate.name, schema: GateSchema }]),
  ],
})
export class GatesModule {}
