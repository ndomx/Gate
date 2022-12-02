import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  last: string;
  
  @Prop({ required: true })
  username: string;
  
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  rootId: string;

  @Prop({ required: true })
  access: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
