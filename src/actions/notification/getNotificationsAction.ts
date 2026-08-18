'use server';

import { getNotificationsUser } from '@/lib/notifications/queries/notification.cache';
import { getSession } from '@/lib/session';
import { Notification } from '@prisma/client';

export type GetNotificationsResult = {
  notifications: Notification[];
  unreadCount: number;
};

export async function getNotificationsAction(): Promise<{
  success: boolean;
  data: GetNotificationsResult;
  error?: string;
}> {
  try {
    const session = await getSession();

    if(!session?.userId) {
        return {
            success: false,
            data: {notifications: [], unreadCount: 0},
            error: "UNAUTHORIZED"
        }
    }

    const notifications = await getNotificationsUser(session.userId);
    return { success: true, data: notifications };
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    return { success: false, data: {notifications: [], unreadCount: 0} };
  }
}
