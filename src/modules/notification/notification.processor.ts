import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "bullmq";
import { Repository } from "typeorm";
import { Notification } from "./notification.entity";
import { NotificationStatus } from "./notification-status.enum";
@Injectable()
@Processor('notification')
export class NotificationProcessor extends WorkerHost {

  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {
    super();
  }

  async process(job: Job): Promise<any> {

    const notification = await this.notificationRepository.findOne({
      where: {
        id: job.data.notificationId,
      },
    });

    try {

      notification.status = NotificationStatus.PROCESSING;

      await this.notificationRepository.save(notification);

      console.log('JOB RECEIVED', job.attemptsMade, job.id);

      if (Math.random() < 0.5) {
        throw new Error('Random failure');
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      notification.status = NotificationStatus.SENT;

      await this.notificationRepository.save(notification);

      console.log('JOB COMPLETED');

    } catch(err) {
        console.log('JOB FAILED==============', err);

      notification.status = NotificationStatus.FAILED;

      notification.retryCount = job.attemptsMade;

      await this.notificationRepository.save(notification);

      throw err;
    }
  }
}