import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';
import { calculateFinancialSummary } from '@/utils/calculate-financial-summary';
import { NextResponse } from 'next/server';

async function GET(request: Request) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const mode =
    (searchParams.get('mode') as 'CURRENT' | 'SCHEDULED') || 'CURRENT';

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
  );

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.userId,
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });

  const summary = calculateFinancialSummary(transactions, mode);
  return NextResponse.json(summary);
}
