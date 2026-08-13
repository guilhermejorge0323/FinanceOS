import { prisma } from '@/lib/prisma';
import { NotificationType } from '@prisma/client';

export interface CreateNotificationDTO {
  userId: string;
  title: string;
  type: NotificationType;
  ttlDays?: number;
}

export class NotificationService {
  static async sendNotification({
    userId,
    title,
    type,
    ttlDays = 7,
  }: CreateNotificationDTO) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + ttlDays);

    return await prisma.notification.create({
      data: {
        userId,
        title,
        type,
        expiresAt,
      },
    });
  }

  static async getUserNotifications(userId: string) {
    return await prisma.notification.findMany({
      where: {
        userId,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      orderBy:  {
        createdAt: 'desc'
      },
      take: 10,
    });
  }
}
