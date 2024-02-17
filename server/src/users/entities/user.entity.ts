import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({ timestamps: true })
export class UserEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  last: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  access: [string];

  @Prop({ required: true })
  authId: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);