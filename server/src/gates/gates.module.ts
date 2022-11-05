import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatesController } from './controllers/gates.controller';
import { Gate, GateSchema } from './schemas/gate.schema';
import { GatesService } from './services/gates.service';

@Module({
  providers: [GatesService],
  controllers: [GatesController],
  imports: [
    MongooseModule.forFeature([{ name: Gate.name, schema: GateSchema }]),
  ],
})
export class GatesModule {}
