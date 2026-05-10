import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { NotificationStatus } from './notification-status.enum';
export interface UserRegisteredEvent {
  userId: number;
  email: string;
  name: string;
}

@Injectable()
    export class NotificationProducer {
      constructor(
      @InjectQueue('notification')
      private queue: Queue,

      @InjectRepository(Notification)
      private notificationRepository: Repository<Notification>,
    ) {}

    async userRegistered(data: UserRegisteredEvent) {

      console.log('ADDING JOB TO QUEUE');

      const notification = this.notificationRepository.create({
        type: 'USER_REGISTERED',
        message: `Welcome ${data.name}`,
        status: NotificationStatus.PENDING,
        title: 'User Registration',
        retryCount: 0,
        createdAt: new Date(),
      });

      await this.notificationRepository.save(notification);

      await this.queue.add(
        'USER_REGISTERED',
        data,
        {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 3000,
          },
          removeOnComplete: true,
          removeOnFail: 500,
        },
      );
    }
}