import { prisma } from '@/lib/prisma';
import { getServerDate } from '@/utils/Date/getServerDate';
import {
  RecurrenceOption,
  TransactionStatus,
  TransactionType,
} from '@prisma/client';

export type CreateTransactionInput = {
  userId: string;
  type: TransactionType;
  amount: number;
  categoryId: number;
  name: string;
  date?: Date | string;
  status: TransactionStatus;
  dueDate?: Date | string | null;
  recurrence?: RecurrenceOption;
  parentId?: string | null;
};

export class TransactionService {
  static getMonthTransactions = async (
    userId: string,
    startDate?: Date,
    endDate?: Date,
  ) => {
    const now = getServerDate();
    const start = startDate || new Date(now.getFullYear(), now.getMonth(), 1);
    const end =
      endDate || new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    return await prisma.transaction.findMany({
      where: {
        userId: userId,
        date: {
          gte: start,
          lte: end,
        },
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

    const baseDate = data.dueDate
      ? new Date(data.dueDate)
      : data.date
        ? new Date(data.date)
        : new Date();

    const recurrence = data.recurrence || RecurrenceOption.NONE;

    const primaryTransaction = await prisma.transaction.create({
      data: {
        userId: data.userId,
        type: data.type,
        amount: data.amount,
        categoryId: data.categoryId,
        name: data.name,
        date: baseDate,
        status: data.status || TransactionStatus.PAID,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        recurrence: recurrence,
        parentId: data.parentId || null,
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

    if (recurrence !== RecurrenceOption.NONE) {
      const futureTransactions = [];
      const occorrences = recurrence === RecurrenceOption.MONTHLY ? 12 : 3;
      const now = new Date();

      for (let i = 1; i <= occorrences; i++) {
        const nextDueDate = new Date(baseDate);

        if (recurrence === RecurrenceOption.MONTHLY) {
          nextDueDate.setMonth(nextDueDate.getMonth() + i);
        } else if (recurrence === RecurrenceOption.YEARLY) {
          nextDueDate.setFullYear(nextDueDate.getFullYear() + i);
        }

        const isFutureMonth =
          nextDueDate.getFullYear() > now.getFullYear() ||
          (nextDueDate.getFullYear() === now.getFullYear() &&
            nextDueDate.getMonth() > now.getMonth());

        const futureStatus = isFutureMonth
          ? TransactionStatus.SCHEDULED
          : TransactionStatus.PENDING;

        futureTransactions.push({
          userId: data.userId,
          type: data.type,
          amount: data.amount,
          categoryId: data.categoryId,
          name: data.name,
          status: futureStatus,
          date: nextDueDate,
          dueDate: nextDueDate,
          recurrence: recurrence,
          parentId: primaryTransaction.id,
        });
      }

      await prisma.transaction.createMany({
        data: futureTransactions,
      });
    }

    return primaryTransaction;
  };

  static deleteTransaction = async (id: string) => {
    return await prisma.transaction.delete({
      where: {
        id: id,
      },
    });
  };
}
