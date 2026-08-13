import { NotificationType } from '@prisma/client';
import { cookies } from 'next/headers';

interface NotificationObj {
  title: string;
  type: NotificationType;
  ttlDays?: number;
}

export async function triggerNotification() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if(!token) {
    
  }
}
