import { prisma } from '@/lib/prisma';

export class TransactionService {
  static getTransactions = async (userId: string) => {
    return await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  };
}
