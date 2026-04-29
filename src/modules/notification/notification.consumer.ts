import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('notification')
export class NotificationConsumer extends WorkerHost {

  async process(job: Job) {
    switch (job.name) {
      case 'USER_REGISTERED':
        console.log('PROCESSING JOB--------------', job.data);
        break;

      default:
        console.log('Unknown job:', job.name);
    }
  }
}