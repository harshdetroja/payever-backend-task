import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'events_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async sendEvent(pattern: string, payload: any): Promise<any> {
    return this.client.emit(pattern, payload).toPromise();
  }

  async sendMessage(pattern: string, payload: any): Promise<any> {
    return this.client.send(pattern, payload).toPromise();
  }
}
