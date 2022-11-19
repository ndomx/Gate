import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop()
  personId: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  roots: [string];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
