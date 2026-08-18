import { prisma } from '@/lib/prisma';
import { schedules } from '@trigger.dev/sdk';

export const cleanUpAndotifyTask = schedules.task({
  id: 'cleanup-and-notify',
  cron: '0 0 * * *',
  run: async () => {
    console.log('Iniciando rotina de notificações...');

    const deleted = await prisma.notification.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    console.log(`Notificações expiradas removidas: ${deleted.count}`);

    return { success: true, deletedCount: deleted.count };
  },
});
