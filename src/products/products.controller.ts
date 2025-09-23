import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  helloWorld(): string {
    return 'Products Controller -> hello world';
  }
}
