import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    UsersModule,
    CartsModule,
    ProductsModule,
    DatabaseModule,
    AuthModule,
    EmailModule,
    RedisModule,
  ],
})
export class AppModule {}
