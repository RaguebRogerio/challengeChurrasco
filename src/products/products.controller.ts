import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {ApiBearerAuth, ApiTags, ApiOperation} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({  description: 'This service is for create at product' })
  @UseGuards(JwtAuthGuard)
  @Post("")
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({  description: 'This service returns all products' })
  @UseGuards(JwtAuthGuard)
  @Get("")
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({  description: 'This service return the product with a specific SKU' })
  @UseGuards(JwtAuthGuard)
  @Get(':sku')
  getBySKU(@Param('sku') sku: string) {
    return this.productsService.getBySKU(sku);
  }

  @ApiOperation({  description: 'This service returns the product according to its name' })
  @UseGuards(JwtAuthGuard)
  @Get('/get-by-name/:name')
  getByName(@Param('name') name: string) {
    return this.productsService.getByName(name);
  }
  
  @ApiOperation({  description: 'This service returns all products according to your currency' })
  @UseGuards(JwtAuthGuard)
  @Get('/get-by-currency/:currency')
  getAllByCurrency(@Param('currency') currency: string) {
    return this.productsService.getAllByCurrency(currency);
  }

  @ApiOperation({  description: 'This service returns all products whose price is lower than the indicated one' })
  @UseGuards(JwtAuthGuard)
  @Get('/get-of-under-price/:price/:currency')
  getOfUnderPrice(
    @Param('price') price: number,
    @Param('currency') currency: string,
    ) {
    return this.productsService.getOfUnderPrice(price,currency);
  }

  @ApiOperation({  description: 'This service returns all products whose price is higher than the indicated one' })
  @UseGuards(JwtAuthGuard)
  @Get('/get-of-over-price/:price/:currency')
  getOfOverPrice(
    @Param('price') price: number,
    @Param('currency') currency: string,
    ) {
    return this.productsService.getOfOverPrice(price,currency);
  }

  @ApiOperation({  description: 'This service returns products within a price range' })
  @UseGuards(JwtAuthGuard)
  @Get('/get-products-in-interval-price/:minprice/:maxprice/:currency')
  getProductsInIntervalPrice(
    @Param('minprice') minPrice: number,
    @Param('maxprice') maxPrice: number,
    @Param('currency') currency: string,
    ) {
    return this.productsService.getProductsInIntervalPrice(minPrice,maxPrice,currency);
  }
}
