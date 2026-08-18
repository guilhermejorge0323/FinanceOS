import { getNotificationsUser } from '@/lib/notifications/queries/notification.cache';
import { getSession } from '@/lib/session';
import { NotificationService } from '@/services/notification/notification.service';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const data = await getNotificationsUser(session.userId);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar notificações' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const userId = session.userId;
    const body = await request.json();

    if (body.markAll) {
      await NotificationService.markAllAsRead(userId);
      revalidateTag(`notifications-${userId}`, '');
      return NextResponse.json({ success: true });
    }

    if (body.notificationId) {
      await NotificationService.markAsRead(body.notificationId, userId);
      revalidateTag(`notifications-${userId}`, '');
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Parâmetros inválidos' },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar notificação' },
      { status: 500 },
    );
  }
}
