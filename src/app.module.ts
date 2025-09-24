import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    CartsModule,
    ProductsModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
