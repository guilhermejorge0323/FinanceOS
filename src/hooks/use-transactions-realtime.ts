'use client';

import { pusherClient } from '@/lib/pusher/pusher-client';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export function useTransactionsRealtime(userId: string) {
  const router = useRouter();

  useEffect(() => {
    if (!userId) return;

    const channelName = `user-${userId}-transactions`;
    const channel = pusherClient.subscribe(channelName);

    const handleUpdate = () => {
      startTransition(() => {
        router.refresh();
      })
    };

    channel.bind('transaction-created', handleUpdate);
    channel.bind('transaction-updated', handleUpdate);
    channel.bind('transaction-deleted', handleUpdate);

    return () => {
        channel.unbind_all();
        pusherClient.unsubscribe(channelName);
    }
  }, [userId, router]);
}
