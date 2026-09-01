import z from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, 'O nome da categoria precisa ter no mínimo 2 caracteres'),
  type: z.enum(['INCOME', 'OUTCOME']),
  icon: z.string().min(1, 'Selecione um ícone para a categoria'),
});
