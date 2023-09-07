import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductsDocument = HydratedDocument<Products>;

@Schema()
export class Products {    
  @Prop({required:true})
  SKU: string;

  @Prop({required:true, unique:true})
  name: string;

  @Prop({required:true})
  pictures: string[];

  @Prop({required:true})
  price: Number;

  @Prop({required:true})
  currency: string;

  @Prop()
  code: Number;

  @Prop()
  description: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);