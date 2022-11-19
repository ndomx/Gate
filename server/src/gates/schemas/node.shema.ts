import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { NodeInfo } from './node-info.schema';

export type NodeDocument = HydratedDocument<Node>;

@Schema()
export class Node {
  @Prop()
  name: string;

  @Prop()
  parent: string;

  @Prop()
  rootId: string;

  @Prop()
  nodeInfo: NodeInfo;
}

export const NodeSchema = SchemaFactory.createForClass(Node);
