import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, CartsModule, ProductsModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {
  constructor(private readonly prisma: PrismaService) {}
}
