import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { RegisterDTO, LogInDTO } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: LogInDTO): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(data.email);

    if (!user || user.password !== data.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // generate jwt and return here
    const payload = { sub: user.id, name: user.name, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(data: RegisterDTO, isAdmin: boolean): Promise<Partial<User>> {
    const userAlreadyExists = await this.userService.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    const user = await this.userService.create({
      email: data.email,
      password: data.password,
      name: data.name,
      role: isAdmin ? 'ADMIN' : 'CLIENT',
    });

    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }
}
