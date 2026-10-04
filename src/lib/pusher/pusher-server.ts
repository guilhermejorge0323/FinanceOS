import Pusher from 'pusher';

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER! || 'sa1',
  useTLS: true,
});

export async function triggerTransactionUpdate(
  userId: string,
  event: 'created' | 'updated' | 'deleted',
  data: any,
) {
  try {
    await pusherServer.trigger(
      `user-${userId}-transactions`,
      `transaction-${event}`,
      data,
    );
  } catch (error) {
    console.error('Erro ao disparar evento no Pusher (Server):', error);
  }
}
