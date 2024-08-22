import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { EmailService } from './email/email.service';

@Module({
  imports: [MongooseModule.forRoot('----mongodb_uri---'), UserModule],
  controllers: [AppController],
  providers: [AppService, RabbitMQService, EmailService],
})
export class AppModule {}
