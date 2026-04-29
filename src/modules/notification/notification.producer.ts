import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationProducer {
  constructor(
    @InjectQueue('notification') private queue: Queue,
  ) {}

  async userRegistered(data: any) {
    console.log('ADDING JOB=============', data);
    await this.queue.add('USER_REGISTERED', data);
  }
}