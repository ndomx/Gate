import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { NodeInfo } from './node-info.schema';

export type NodeDocument = HydratedDocument<Node>;

@Schema()
export class Node {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  parentId: string;

  @Prop({ required: true })
  rootId: string;

  @Prop({ required: true })
  nodeInfo: NodeInfo;
}

export const NodeSchema = SchemaFactory.createForClass(Node);
