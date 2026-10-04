import z from 'zod';

export const transactionSchema = z.object({
  type: z.enum(['INCOME', 'OUTCOME']),
  amount: z
    .number({ error: 'Informe um valor numérico válido' })
    .positive('O valor precisa ser maior que R$ 0,00'),
  categoryId: z.number({ error: 'Selecione uma categoria para a transação' }),
  name: z.string().min(1, 'O nome é obrigatório').max(50, 'O nome deve ter no máximo 50 caracteres'),
  status: z
    .enum(['PAID', 'PENDING', 'SCHEDULED', 'PLANNED', 'SCHEDULED_PAID'])
    .default('PAID'),
  dueDate: z
    .union([z.string(), z.date()])
    .optional()
    .transform(val => (val ? new Date(val) : undefined)),
  recurrence: z.enum(['NONE', 'MONTHLY', 'YEARLY']).default('NONE'),
  parentId: z.string().optional().nullable(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
