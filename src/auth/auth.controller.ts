import { Body, Controller, Post, Query } from '@nestjs/common';
import type { LogInDTO, RegisterDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LogInDTO): Promise<{ access_token: string }> {
    return this.authService.login(body);
  }

  @Post('register')
  async register(
    @Body() body: RegisterDTO,
    @Query('isAdmin') isAdmin: string,
  ): Promise<Partial<User>> {
    return this.authService.register(body, isAdmin);
  }
}
