import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TestController } from './notification.controller';
import { NotificationProducer } from './notification.producer';
import { NotificationProcessor } from './notification.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
    }),
  ],
  controllers: [TestController],
  providers: [NotificationProducer, NotificationProcessor],
})
export class NotificationModule {}