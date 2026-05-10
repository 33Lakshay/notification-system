import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TestController } from './notification.controller';
import { NotificationProducer } from './notification.producer';
import { NotificationProcessor } from './notification.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
    }),

    TypeOrmModule.forFeature([Notification])
  ],
  controllers: [TestController],
  providers: [NotificationProducer, NotificationProcessor],
})
export class NotificationModule {}