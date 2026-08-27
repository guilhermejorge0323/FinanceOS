type TransactionItem = {
  type: string;
  amount: number | any;
};

export function calculateFinancialSummary(transactions: TransactionItem[]) {
  const summary = transactions.reduce(
    (acc, item) => {
      const amount = Number(item.amount);

      if (item.type === 'INCOME') {
        acc.totalIncomes += amount;
        acc.incomesCount += 1;
      } else if (item.type === 'EXPENSE' || item.type === 'OUTCOME') {
        acc.totalExpenses += amount;
        acc.expensesCount += 1;
      }

      return acc;
    },
    {
      totalIncomes: 0,
      incomesCount: 0,
      totalExpenses: 0,
      expensesCount: 0,
    },
  );

  const balance = summary.totalIncomes - summary.totalExpenses;

  return {
    balance,
    totalIncomes: summary.totalIncomes,
    incomesCount: summary.incomesCount,
    totalExpenses: summary.totalExpenses,
    expensesCount: summary.expensesCount,
  };
}
