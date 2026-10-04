import { prisma } from '@/lib/prisma';
import { triggerTransactionUpdate } from '@/lib/pusher/pusher-server';
import { TransactionStatus } from '@prisma/client';
import { schedules } from '@trigger.dev/sdk/v3';

export const processScheduledTransactionsTask = schedules.task({
  id: 'process-scheduled-transactions',
  cron: '0 0 * * *',
  run: async () => {
    console.log('Iniciando processamento de transações agendadas...');

    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfCurrentMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const scheduledToPending = await prisma.transaction.findMany({
      where: {
        status: TransactionStatus.SCHEDULED,
        dueDate: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
    });

    if (scheduledToPending.length > 0) {
      await prisma.transaction.updateMany({
        where: { id: { in: scheduledToPending.map((t) => t.id) } },
        data: { status: TransactionStatus.PENDING },
      });

      const userIdsToRevalidate = Array.from(new Set(scheduledToPending.map((t) => t.userId)));
      for (const userId of userIdsToRevalidate) {
        try {
          await fetch(`${baseUrl}/api/revalidate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
          });
        } catch (error) {
          console.error(`Erro ao revalidar cache para o usuário ${userId}:`, error);
        }
      }
    }

    const duePending = await prisma.transaction.findMany({
      where: {
        status: TransactionStatus.PENDING,
        dueDate: {
          lte: now,
        },
      },
    });

    if (duePending.length > 0) {
      await prisma.transaction.updateMany({
        where: { id: { in: duePending.map((t) => t.id) } },
        data: { status: TransactionStatus.SCHEDULED_PAID },
      });

      for (const t of duePending) {
        try {
          await fetch(`${baseUrl}/api/revalidate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: t.userId }),
          });
        } catch (error) {
          console.error(`Erro ao revalidar cache do usuário ${t.userId}:`, error);
        }

        await triggerTransactionUpdate(t.userId, 'updated', {
          id: t.id,
          status: TransactionStatus.SCHEDULED_PAID,
        });
      }
    }

    return {
      success: true,
      promotedToPending: scheduledToPending.length,
      executedToPaid: duePending.length,
    };
  },
});
