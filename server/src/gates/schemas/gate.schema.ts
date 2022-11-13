import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GateDocument = HydratedDocument<Gate>;

@Schema()
export class Gate {
  @Prop()
  name: string;

  @Prop()
  parent: string;

  @Prop()
  isDevice: Boolean;
}

export const GateSchema = SchemaFactory.createForClass(Gate);
