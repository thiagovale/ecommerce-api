import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { EmailJobData } from './email.processor';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(@InjectQueue('email-queue') private emailQueue: Queue) {}

  async sendConfirmationEmail(userData: EmailJobData) {
    this.logger.log(
      `📧 Adicionando job de email para usuário ${userData.name}`,
    );

    const job = await this.emailQueue.add('send-confirmation-email', userData, {
      attempts: 3,
      delay: 1000, // 1 segundo de delay
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });

    this.logger.log(`✅ Job criado com ID: ${job.id}`);
    return job;
  }
}
