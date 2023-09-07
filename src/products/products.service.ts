import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products, ProductsDocument } from './schema/products.schema';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  constructor(@InjectModel(Products.name) private productModule:Model<ProductsDocument>){

  }

  async create(createProductDto: CreateProductDto) {
    const productCreated = await this.productModule.create(createProductDto);
    return productCreated;
  }

  findAll() {
    return `This action returns all products`;
  }

  async findOne(idProduct: number) {
    const productReturn = await this.productModule.findOne({where: { id: idProduct }});
    return productReturn
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
