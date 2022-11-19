import { Prop } from '@nestjs/mongoose';

export class NodeInfo {
  @Prop()
  isDevice: boolean;
}
