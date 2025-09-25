import {
  Injectable,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProductDTO, UpdateProductDTO } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: any): Promise<Product[]> {
    const { page = 1, limit = 10, ...filters } = params;
    const skip = (page - 1) * limit;

    return await this.prisma.product.findMany({
      where: filters,
      skip,
      take: limit,
    });
  }

  async create(data: CreateProductDTO): Promise<Product> {
    return await this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description || null,
        price: data.price,
        stock: data.stock,
      },
    });
  }

  async update(data: UpdateProductDTO, productId: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.prisma.product.update({
      where: { id: Number(productId) },
      data: {
        name: data.name,
        description: data.description || null,
        price: data.price,
        stock: data.stock,
      },
    });
  }

  async delete(productId: string): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.prisma.product.delete({
      where: { id: Number(productId) },
    });
  }
}
