import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('carts')
@UseGuards(AuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  async getCart(@Request() req) {
    const userId = req.user.sub;
    return this.cartsService.findCart(userId);
  }

  @Post('items')
  async addItem(
    @Request() req,
    @Body() body: { productId: number; quantity: number },
  ) {
    const userId = req.user.sub;
    return this.cartsService.addItem(userId, body.productId, body.quantity);
  }

  @Put('items/:itemId')
  async updateItem(
    @Request() req,
    @Param('itemId') itemId: string,
    @Body() body: { quantity: number },
  ) {
    const userId = req.user.sub;
    return this.cartsService.updateItem(userId, Number(itemId), body.quantity);
  }

  @Delete('items/:itemId')
  async removeItem(@Request() req, @Param('itemId') itemId: string) {
    const userId = req.user.sub;
    await this.cartsService.removeItem(userId, Number(itemId));
    return { message: 'Item removed from cart' };
  }

  @Delete()
  async clearCart(@Request() req) {
    const userId = req.user.sub;
    await this.cartsService.clearCart(userId);
    return { message: 'Cart cleared' };
  }
}
