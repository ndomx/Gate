import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Person } from './person.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  personId: string;

  @Prop()
  rootId: string;

  @Prop()
  access: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
