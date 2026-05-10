import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NotificationStatus } from "./notification-status.enum";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    message: string;

    @Column()
    type: string;

    @Column({ 
        type: 'enum',
        enum: NotificationStatus,
        default: NotificationStatus.PENDING
    })
    status: NotificationStatus;

    @Column({ default: false })
    isRead: boolean;

    @Column()
    retryCount: number;

    @Column()
    createdAt: Date;
}