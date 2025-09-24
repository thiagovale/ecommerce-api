import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  helloWorld(): string {
    return 'Users Controller -> hello world';
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Get('list')
  async findAll(@Request() req): Promise<User[]> {
    console.log('usuario = ', req.user);
    return this.usersService.findAll();
  }
}
