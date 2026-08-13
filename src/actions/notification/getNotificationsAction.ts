'use server';

import { getNotificationsUser } from '@/lib/notifications/queries/notification.cache';
import { getSession } from '@/lib/session';
import { Notification } from '@prisma/client';

export async function getNotificationsAction(): Promise<{
  success: boolean;
  data: Notification[];
  error?: string;
}> {
  try {
    const session = await getSession();

    if(!session?.userId) {
        return {
            success: false,
            data: [],
            error: "UNAUTHORIZED"
        }
    }

    const notifications = await getNotificationsUser(session.userId);
    return { success: true, data: notifications };
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    return { success: false, data: [] };
  }
}
