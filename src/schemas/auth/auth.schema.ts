import { z } from 'zod';

// Regex para validar apenas letras (incluindo acentos) e espaços
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

// Regex para garantir pelo menos 1 letra maiúscula
const uppercaseRegex = /[A-Z]/;

// Regex para garantir pelo menos 1 caractere especial
const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

// ==========================================
// 1. Schema para Cadastro ("Cadastrar")
// ==========================================
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'O nome deve ter no mínimo 2 caracteres')
    .regex(nameRegex, 'O nome deve conter apenas letras'),

  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Digite um e-mail válido')
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(uppercaseRegex, 'A senha deve conter pelo menos 1 letra maiúscula')
    .regex(specialCharRegex, 'A senha deve conter pelo menos 1 caractere especial (!@#$%...)'),
});

// ==========================================
// 2. Schema para Login ("Entrar")
// ==========================================
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Digite um e-mail válido')
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(1, 'A senha é obrigatória'),
});

// ==========================================
// 3. Tipos Inferidos do TypeScript
// ==========================================
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
