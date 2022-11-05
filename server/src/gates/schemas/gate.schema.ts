import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GateDocument = HydratedDocument<Gate>;

@Schema()
export class Gate {
  @Prop()
  gateId: string;

  @Prop()
  name: string;

  @Prop([String])
  allowedDevices: string[];
}

export const GateSchema = SchemaFactory.createForClass(Gate);
