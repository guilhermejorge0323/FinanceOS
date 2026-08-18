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
    const now = new Date();

    const expiryFilter = {
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    };

    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: {
          userId,
          ...expiryFilter,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      }),
      prisma.notification.count({
        where: {
          userId,
          read: false,
          ...expiryFilter,
        },
      }),
    ]);

    return { notifications, unreadCount };
  }

  static async markAsRead(notificationId: string, userId: string) {
    return await prisma.notification.updateMany({
        where: {
            id: notificationId,
            userId,
        },
        data: {
            read: true,
        }
    });
  }

  static async markAllAsRead(userId: string) {
    return await prisma.notification.updateMany({
        where: {
            userId,
            read: false
        },
        data: {
            read: true
        }
    });
  }
}
