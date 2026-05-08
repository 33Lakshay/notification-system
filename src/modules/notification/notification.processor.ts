import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job } from "bullmq";

@Injectable()
@Processor('notification')
export class NotificationProcessor extends WorkerHost {

    async process(job: Job<any, any, string>): Promise<any> {

        console.log('JOB RECEIVED', job.attemptsMade, job.id);

        if (Math.random() < 0.5) {
           throw new Error('Random failure');
        }

        // switch (job.name) {
        //     case 'USER_REGISTERED':
        //         console.log('PROCESSING JOB--------------', job.data);
        //         break;

        //     default:
        //         console.log('Unknown job:', job.name);
        // }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log('JOB COMPLETED');
    }
}