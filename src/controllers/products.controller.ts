import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { ProductsService } from './../services/products.service';
import { Product as ProductModel } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // Post in memory
  @Post('memory')
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  // Post with Prisma
  @Post()
  async CreateProduct(@Body() payload: CreateProductDto) {
    const { name, description, price, stock, image } = payload;
    return this.productsService.product.create({
      data: {
        name,
        description,
        price,
        stock,
        image,
      },
    });
  }

  // @Get()
  // getProducts(
  //   @Query('limit') limit = 100,
  //   @Query('offset') offset = 0,
  //   @Query('brand') brand: string,
  // ) {
  //   return `Limit: ${limit}, Offset: ${offset}, Brand: ${brand}`;
  // }

  // Get all products in memory
  @Get('memory')
  getProducts() {
    return this.productsService.findAll();
  }

  // Get with Prisma
  @Get()
  async getAllProducts(): Promise<ProductModel[]> {
    return this.productsService.product.findMany();
  }

  @Get('filter')
  getProductFilter() {
    return `Esto es un filter`;
  }

  // Get with memory
  @Get('memory/:id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // Get with prisma
  @Get(':id')
  async getProductP(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.product.findUnique({
      where: { id: id },
    });
  }

  // Put with memory
  @Put('memory/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  // Put with prisma
  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ): Promise<ProductModel> {
    return this.productsService.product.update({
      where: { id: id },
      data: { ...payload },
    });
  }

  // Delete with memory
  @Delete('memory/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  // Delete with prisma
  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.product.delete({ where: { id: id } });
  }
}
