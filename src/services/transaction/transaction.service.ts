import { prisma } from '@/lib/prisma';
import { RecurrenceOption, TransactionStatus, TransactionType } from '@prisma/client';

export type CreateTransactionInput = {
  userId: string;
  type: TransactionType;
  amount: number;
  categoryId: number;
  description: string;
  date?: Date | string;
  status: TransactionStatus;
  dueDate?: Date | string | null;
  recurrence?: RecurrenceOption;
  parentId?: string | null;
};

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

  static createTransaction = async (data: CreateTransactionInput) => {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new Error('Categoria não encontrada.');
    }

    return await prisma.transaction.create({
      data: {
        userId: data.userId,
        type: data.type,
        amount: data.amount,
        categoryId: data.categoryId,
        description: data.description,
        date: data.date ? new Date(data.date) : new Date(),
        status: data.status || TransactionStatus.PAID,
      },
      include: {
        category: {
          select: {
            name: true,
            icon: true,
          },
        },
      },
    });
  };

  static deleteTransaction = async (id: string) => {
    return await prisma.transaction.delete({
      where: {
        id: id,
      },
    });
  };
}
