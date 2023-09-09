import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("getAll")
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':sku')
  getBySKU(@Param('sku') sku: string) {
    return this.productsService.getBySKU(sku);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getOfUnderPrince/:price/:currency')
  getOfUnderPrince(
    @Param('price') price: number,
    @Param('currency') currency: string,
    ) {
    return this.productsService.getOfUnderPrince(price,currency);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('/getOfUnderPrince/:minprice/:maxprice/:currency')
  getProductsInIntervalPrice(
    @Param('minprice') minPrice: number,
    @Param('maxprice') maxPrice: number,
    @Param('currency') currency: string,
    ) {
    return this.productsService.getProductsInIntervalPrice(minPrice,maxPrice,currency);
  }
}
