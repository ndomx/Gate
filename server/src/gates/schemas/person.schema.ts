import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PersonDocument = HydratedDocument<Person>;

@Schema()
export class Person {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  last: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
