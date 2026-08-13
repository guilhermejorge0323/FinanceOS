import { formatNotificationDate } from '@/utils/formatNotificationDate';
import { Notification, NotificationType } from '@prisma/client';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

import { use, useEffect, useState } from 'react';

const notificationIconMap: Record<NotificationType, string> = {
  AI: '🤖',
  BILLING: '💵',
  ALERT: '⚠️',
};

type NotificationCardProps = {
  notifications: Notification[];
  isLoading: boolean;
};

export function NotificationCard({
  notifications,
  isLoading,
}: NotificationCardProps) {
  return (
    <div
      className={clsx(
        'fixed inset-x-3 top-16 z-50',
        'md:absolute md:right-0 md:top-full md:inset-auto md:mt-2 md:w-80',
        'max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl',
        'dark:border-slate-800 dark:bg-primary-dark-card',
      )}
    >
      <div className=''>
        <div className='px-4 py-3 border-b border-border-home dark:border-slate-800'>
          <h3 className='text-sm font-bold text-primary-blue dark:text-primary-home'>
            Notificações
          </h3>
        </div>

        {isLoading ? (
          <div className='flex items-center justify-center gap-2 px-4 py-6 text-xs text-slate-400 dark:text-slate-500'>
            <Loader2 className='h-4 w-4 animate-spin text-primary-blue dark:text-primary-home' />
            <span>Carregando notificações...</span>
          </div>
        ) : notifications.length > 0 ? (
          notifications.map(item => (
            <div
              key={item.id}
              className={clsx(
                'px-4 py-3',
                'text-sm text-primary-blue dark:text-slate-300 wrap-break-word',
                'border-b border-border-home dark:border-slate-800 last:border-b-0',
                'flex items-center gap-3',
              )}
            >
              <span className='text-lg'>{notificationIconMap[item.type]}</span>
              <div>
                <p className='font-semibold'>{item.title}</p>
                <p className='text-xs text-slate-500 dark:text-primary-text-dark mt-0.5'>
                  {formatNotificationDate(item.createdAt)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className='px-4 py-6 text-center text-xs text-slate-400 dark:text-slate-500'>
            Nenhuma notificação encontrada.
          </div>
        )}
      </div>
    </div>
  );
}
