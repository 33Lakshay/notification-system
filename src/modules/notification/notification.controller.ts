import { Controller, Post } from '@nestjs/common';
import { NotificationProducer } from './notification.producer';

@Controller('test')
export class TestController {
  constructor(private producer: NotificationProducer) {}

  @Post()
  async testEvent() {
    await this.producer.userRegistered({
      userId: 1,
      email: 'lakshay@test.com',
      name: 'Lakshay',
    });

    return { message: 'Event sent' };
  }
}