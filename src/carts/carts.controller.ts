import { Controller, Get } from '@nestjs/common';

@Controller('carts')
export class CartsController {
  @Get()
  helloWorld(): string {
    return 'Carts Controller -> hello world';
  }
}
