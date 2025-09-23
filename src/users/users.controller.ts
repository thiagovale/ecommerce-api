import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  helloWorld(): string {
    return 'Users Controller -> hello world';
  }
}
