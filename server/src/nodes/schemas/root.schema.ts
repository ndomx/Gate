import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RootDocument = HydratedDocument<Root>;

@Schema({ timestamps: true })
export class Root {
  @Prop({ required: true })
  name: string;
}

export const RootSchema = SchemaFactory.createForClass(Root);
