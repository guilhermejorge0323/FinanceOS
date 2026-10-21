import { RecurrenceOption, TransactionStatus } from '@prisma/client';

export function renderStatusChip(status: TransactionStatus) {
  switch (status) {
    case 'PENDING':
    case 'SCHEDULED':
      return (
        <span className='text-[9px] font-medium px-1.5 py-0.5 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/40 rounded shrink-0'>
          Agendado
        </span>
      );

    case 'SCHEDULED_PAID':
      return (
        <span className='text-[9px] font-medium px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40 rounded shrink-0'>
          Pago
        </span>
      );

    case 'PLANNED':
      return (
        <span className='text-[9px] font-medium px-1.5 py-0.5 bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 border border-sky-200/50 dark:border-sky-800/40 rounded shrink-0'>
          Planejado
        </span>
      );

    default:
      return null;
  }
}

export function renderRecurrenceChip(recurrence: RecurrenceOption) {
  switch (recurrence) {
    case 'MONTHLY':
      return (
        <span className='inline-flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 bg-blue-50/80 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40 rounded-md shrink-0 tracking-wide'>
          Mensal
        </span>
      );

    case 'YEARLY':
      return (
        <span className='inline-flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 bg-purple-50/80 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/40 rounded-md shrink-0 tracking-wide'>

          Anual
        </span>
      );

    default:
      return null;
  }
}
