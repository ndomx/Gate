import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  personId: string;

  @Prop({ required: true })
  rootId: string;

  @Prop({ required: true })
  access: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
