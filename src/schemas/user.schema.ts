import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  userId: number;

  @Prop()
  email: string;

  @Prop()
  fname: string;

  @Prop()
  lname: string;

  @Prop()
  avatar: string;

  @Prop()
  hash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
