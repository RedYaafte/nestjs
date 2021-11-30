import { Controller, Get } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getBrands(): string {
    return '<h1>Brands</h1>';
  }
}
