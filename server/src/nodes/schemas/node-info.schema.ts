import { Prop } from '@nestjs/mongoose';

export class NodeInfo {
  @Prop({ required: true })
  isDevice: boolean;

  @Prop({ required: true })
  actionCode: string;
}
