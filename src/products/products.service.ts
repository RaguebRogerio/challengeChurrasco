import { Injectable, HttpException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import { CreateProductDto } from './dto/create-product.dto';
import { Products, ProductsDocument } from './schema/products.schema';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  constructor(@InjectModel(Products.name) private productModule:Model<ProductsDocument>){

  }

  async create(createProductDto: CreateProductDto): Promise<Products> {
    const productCreated = await this.productModule.create(createProductDto);
    return productCreated;
  }

  async findAll() : Promise<Products[]> {
    const listAllProduct = await this.productModule.find({});
    return listAllProduct;
  }

  async findOne(skuProduct: string): Promise<Products> {
    const productReturn = await this.productModule.findOne({SKU:skuProduct});
    if(!productReturn) throw new HttpException('product_not_found', 404);
    return productReturn
  }
}
