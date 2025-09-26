import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/users.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserDTO): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });

    this.emailService
      .sendConfirmationEmail({
        userId: user.id.toString(),
        email: user.email,
        name: user.name,
        confirmationLink: `http://localhost:3000/auth/confirm/${user.id}`,
      })
      .catch((error) => {
        console.error('Error sending confirmation email:', error);
      });

    return user;
  }
}
