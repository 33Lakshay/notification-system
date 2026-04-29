import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TestController } from './notification.controller';
import { NotificationProducer } from './notification.producer';
import { NotificationConsumer } from './notification.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
    }),
  ],
  controllers: [TestController],
  providers: [NotificationProducer, NotificationConsumer],
})
export class NotificationModule {}