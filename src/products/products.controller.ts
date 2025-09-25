import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from 'src/auth/role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Product } from '@prisma/client';
import type { CreateProductDTO, UpdateProductDTO } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async list(@Query() params: any): Promise<Product[]> {
    return this.productsService.findAll(params);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() data: CreateProductDTO): Promise<Product> {
    return this.productsService.create(data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Put(':id')
  async update(
    @Body() data: UpdateProductDTO,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productsService.update(data, id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productsService.delete(id);
  }
}
