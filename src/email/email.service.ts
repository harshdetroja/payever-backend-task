import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    // Dummy transporter setup for testing, no actual email will be sent.
    host: 'smtp.example.com',
    port: 587,
    auth: {
      user: 'dummyuser@example.com',
      pass: 'dummypassword',
    },
  });

  async sendEmail(to: string, subject: string, text: string) {
    // Simulate sending an email
    console.log(`Sending email to ${to} with subject: ${subject}`);
    return this.transporter.sendMail({
      from: '"No Reply" <noreply@example.com>',
      to,
      subject,
      text,
    });
  }
}
