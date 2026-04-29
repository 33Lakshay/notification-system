import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueModule } from './modules/queue/queue.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Lakshay@1',
      database: 'notification_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    QueueModule,
    NotificationModule,
  ]
})

export class AppModule {}