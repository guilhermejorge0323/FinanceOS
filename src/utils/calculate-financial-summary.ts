import { TransactionStatus, TransactionType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/client';

export type DashboardMode = 'CURRENT' | 'SCHEDULED';

export interface FinancialSummaryTransactionItem {
  amount: number | Decimal;
  type: TransactionType;
  status: TransactionStatus;
}

export function calculateFinancialSummary(
  transactions: FinancialSummaryTransactionItem[],
  mode: DashboardMode = 'CURRENT',
) {
  let totalIncomes = 0;
  let incomesCount = 0;
  let totalExpenses = 0;
  let expensesCount = 0;

  transactions.forEach(t => {
    const amount = Number(t.amount);

    if (mode === 'CURRENT') {
      if (
        t.status === TransactionStatus.PAID ||
        t.status === TransactionStatus.SCHEDULED_PAID
      ) {
        if (t.type === TransactionType.INCOME) {
          totalIncomes += amount;
          incomesCount++;
        } else {
          totalExpenses += amount;
          expensesCount++;
        }
      }
    } else if (mode === 'SCHEDULED') {
      if (
        t.status === TransactionStatus.SCHEDULED ||
        t.status === TransactionStatus.PLANNED ||
        t.status === TransactionStatus.SCHEDULED_PAID ||
        t.status === TransactionStatus.PENDING
      ) {
        if (t.type === TransactionType.INCOME) {
          totalIncomes += amount;
          incomesCount++;
        } else {
          totalExpenses += amount;
          expensesCount++;
        }
      }
    }
  });

  const balance = totalIncomes - totalExpenses;

  return {
    balance,
    totalIncomes,
    incomesCount,
    totalExpenses,
    expensesCount,
  };
}
