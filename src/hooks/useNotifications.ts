'use client';

import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { Notification } from '@prisma/client';

export interface UserNotificationResponse {
  notifications: Notification[];
  unreadCount: number;
}

const fetcher = async (url: string, router: ReturnType<typeof useRouter>) => {
  const res = await fetch(url);

  if (res.status === 401) {
    router.push('/auth');
    return null;
  }

  if (!res.ok) {
    throw new Error('Erro ao buscar notifications');
  }

  return res.json();
};

export function useNotifications(initialData?: UserNotificationResponse) {
  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWR<UserNotificationResponse>(
    '/api/notification',
    (url: string) => fetcher(url, router),
    {
      refreshInterval: 10000,
      revalidateOnFocus: true,
      fallbackData: initialData,
    },
  );

  const markAsRead = async (notificationId: string) => {
    mutate(
      prev =>
        prev
          ? {
              ...prev,
              unreadCount: Math.max(0, prev.unreadCount - 1),
              notifications: prev.notifications.map(n =>
                n.id === notificationId ? { ...n, read: true } : n,
              ),
            }
          : prev,
      false,
    );

    await fetch('/api/notification', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notificationId }),
    });

    mutate();
  };

  const markAllAsRead = async () => {
    mutate(
      prev =>
        prev
          ? {
              ...prev,
              unreadCount: 0,
              notifications: prev.notifications.map(n => ({
                ...n,
                read: true,
              })),
            }
          : prev,
      false,
    );

    await fetch('/api/notification', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markAll: true }),
    });

    mutate();
  };

  return {
    notifications: data?.notifications || [],
    unreadCount: data?.unreadCount || 0,
    isLoading,
    isError: error,
    markAsRead,
    markAllAsRead
  }
}
