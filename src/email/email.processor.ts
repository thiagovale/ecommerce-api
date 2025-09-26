import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { Injectable, Logger } from '@nestjs/common';

export interface EmailJobData {
  userId: string;
  email: string;
  name: string;
  confirmationLink?: string;
}

@Processor('email-queue')
@Injectable()
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  @Process('send-confirmation-email')
  async handleEmailConfirmation(job: Job<EmailJobData>) {
    const { userId, email, name, confirmationLink } = job.data;

    this.logger.log('=== NOVO USUÁRIO CADASTRADO ===');
    this.logger.log(`User ID: ${userId}`);
    this.logger.log(`Nome: ${name}`);
    this.logger.log(`Email: ${email}`);
    this.logger.log(
      `Link de Confirmação: ${confirmationLink || 'http://localhost:3000/auth/confirm/' + userId}`,
    );
    this.logger.log('=== EMAIL SIMULADO ENVIADO ===');

    // Simular delay de envio de email
    await new Promise((resolve) => setTimeout(resolve, 2000));

    this.logger.log(`✅ Email de confirmação "enviado" para ${email}`);
  }
}
