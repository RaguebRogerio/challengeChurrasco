import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {    
  @Prop({required:true, unique:true})
  username: string;

  @Prop({required:true, unique:true})
  email: string;

  @Prop({required:true})
  password: string;

  @Prop({required:true})
  price: Number;

  @Prop({required:true})
  role: string;

  @Prop({required:true})
  active: Boolean;

  @Prop({required:true})
  firstName: string;

  @Prop({required:true})
  lastName: string;

  @Prop({required:true})
  birthday: Date;

  @Prop()
  lastLogin: Date;
}

export const ProductsSchema = SchemaFactory.createForClass(Users);