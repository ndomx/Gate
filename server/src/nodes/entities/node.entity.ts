import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NodeDocument = HydratedDocument<Node>;

@Schema({ timestamps: true })
export class Node {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  actionCode: string;

  @Prop({ required: true })
  deviceId: string;
}

export const NodeSchema = SchemaFactory.createForClass(Node);
