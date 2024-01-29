import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NodeDocument = HydratedDocument<NodeEntity>;

@Schema()
export class NodeEntity {
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
