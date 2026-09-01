import z from 'zod';

export const transactionSchema = z.object({
  type: z.enum(['INCOME', 'OUTCOME']),
  amount: z
    .number({ error: 'Informe um valor numérico válido' })
    .positive('O valor precisa ser maior que R$ 0,00'),
  categoryId: z.number({ error: 'Selecione uma categoria para a transação' }),
  description: z.string().optional(),
});
