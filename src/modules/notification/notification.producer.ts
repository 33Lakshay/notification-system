import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationProducer {
  constructor(
    @InjectQueue('notification') private queue: Queue,
  ) {}

  async userRegistered(data: any) {
    console.log('ADDING JOB TO QUEUE');
    await this.queue.add('USER_REGISTERED', 
      data,
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 3000,
        },
        removeOnComplete: true,
        removeOnFail: 500,
      }
    );
  }
}