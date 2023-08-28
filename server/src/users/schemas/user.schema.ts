import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  last: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  rootId: string;

  @Prop({ required: true })
  access: [string];

  @Prop({ default: ['user'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
