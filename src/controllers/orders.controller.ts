import { Controller, Get } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getOrders(): string {
    return '<h1>Orders</h1>';
  }
}
