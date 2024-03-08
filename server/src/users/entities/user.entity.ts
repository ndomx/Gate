import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  externalId: string;

  @Prop({ required: true })
  access: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
