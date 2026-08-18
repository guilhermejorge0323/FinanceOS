import { NotificationService } from '@/services/notification/notification.service';
import { Notification } from '@prisma/client';
import { cacheTag } from 'next/cache';

export async function getNotificationsUser(
  userId: string,
) {
  'use cache';
  cacheTag(`notifications-${userId}`);
  return await NotificationService.getUserNotifications(userId);
}
