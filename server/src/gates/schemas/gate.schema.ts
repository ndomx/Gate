import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NodeDocument = HydratedDocument<Node>;

@Schema()
export class Node {
  @Prop()
  name: string;

  @Prop()
  parent: string;

  @Prop()
  isDevice: Boolean;
}

export const NodeSchema = SchemaFactory.createForClass(Node);
