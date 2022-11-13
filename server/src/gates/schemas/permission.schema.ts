import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Permission {
  @Prop()
  rootId: string;

  @Prop()
  prefix: string;
}
