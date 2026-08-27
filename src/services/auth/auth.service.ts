import { prisma } from '@/lib/prisma';
import { LoginInput, RegisterInput } from '@/schemas/auth/auth.schema';
import { TransactionType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const DEFAULT_CATEGORIES = [
  // INCOME
  { name: 'Salário', type: TransactionType.INCOME, icon: 'Briefcase' },
  { name: 'Freelance', type: TransactionType.INCOME, icon: 'Laptop' },
  { name: 'Investimentos', type: TransactionType.INCOME, icon: 'TrendingUp' },
  { name: 'Outros', type: TransactionType.INCOME, icon: 'PlusCircle' },
  // OUTCOME
  { name: 'Moradia', type: TransactionType.OUTCOME, icon: 'Home' },
  { name: 'Alimentação', type: TransactionType.OUTCOME, icon: 'Utensils' },
  { name: 'Transporte', type: TransactionType.OUTCOME, icon: 'Car' },
  { name: 'Lazer', type: TransactionType.OUTCOME, icon: 'Gamepad2' },
  { name: 'Saúde', type: TransactionType.OUTCOME, icon: 'HeartPulse' },
  { name: 'Outros', type: TransactionType.OUTCOME, icon: 'MinusCircle' },
];

export class AuthService {
  static async register(data: RegisterInput) {
    const { name, email, password } = data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email ja cadastrado');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const now = new Date();
    const currentMonthYear = `{${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

    const newUser = await prisma.$transaction(async tx => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      await tx.category.createMany({
        data: DEFAULT_CATEGORIES.map(cat => ({
          userId: user.id,
          name: cat.name,
          type: cat.type,
          icon: cat.icon,
          isCustom: false,
        })),
      });

      await tx.financialScore.create({
        data: {
          userId: user.id,
          totalScore: 0,
          incomeVsOutcomeScore: 0,
          planningAdherenceScore: 0,
          investmentScore: 0,
          historyConsistencyScore: 0,
          monthYear: currentMonthYear,
        },
      });

      return user;
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };
  }

  static async login(credentials: LoginInput) {
    const { email, password } = credentials;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      throw new Error('Email ou senha invalidos');
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw new Error('Email ou senha invalidos');
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
