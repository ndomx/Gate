import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Permission } from './permission.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  last: string;

  @Prop()
  admin: [Permission];

  @Prop()
  access: [Permission];
}

export const UserSchema = SchemaFactory.createForClass(User);
