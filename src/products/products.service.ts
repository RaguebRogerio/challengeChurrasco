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
    if(!listAllProduct) throw new HttpException('there are no products', 500);
    return listAllProduct;
  }

  async getBySKU(skuProduct: string): Promise<Products> {
    const productReturn = await this.productModule.findOne({SKU:skuProduct});
    if(!productReturn) throw new HttpException('product_not_match', 404);
    return productReturn
  }

  async getOfUnderPrice(price: number, currency: string): Promise<Products[]> {
    const productReturn = await this.productModule.find({ price: { $lt: price }, currency }).exec();
    if(!productReturn) throw new HttpException('product_not_match', 404);
    return productReturn
  }

  async getOfOnPrice(price: number, currency: string): Promise<Products[]> {
    const productReturn = await this.productModule.find({ price: { $gt: price }, currency }).exec();
    if(!productReturn) throw new HttpException('product_not_match', 404);
    return productReturn
  }

  async getProductsInIntervalPrice(minPrice: number, maxPrice:number, currency: string): Promise<Products[]> {
    const productReturn = await this.productModule.find({ price: { $gte: minPrice, $lte: maxPrice }, currency }).exec();
    if(!productReturn) throw new HttpException('product_not_match', 404);
    return productReturn
  }
}
