'use server';

import { NotificationService } from '@/services/notification/notification.service';
import { revalidateTag } from 'next/cache';

export async function triggerTestNotificationAction() {
  await NotificationService.sendNotification({
    userId: 'cmsppd21z000ac49a0ix0yo7y',
    title: 'Notificacao de teste',
    type: 'AI',
    ttlDays: 10,
  });

  console.log('disparou');


  revalidateTag('notifications-cmsppd21z000ac49a0ix0yo7y', '');
}
