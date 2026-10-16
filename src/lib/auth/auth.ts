import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createSession } from "../session";
import { prisma } from "../prisma";
import { TransactionType } from "@prisma/client";

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

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!dbUser) {
          const now = new Date();
          const currentMonthYear = `{${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

          dbUser = await prisma.$transaction(async tx => {
            const newUser = await tx.user.create({
              data: {
                name: user.name || "Usuário",
                email: user.email!,
                passwordHash: "",
              },
            });

            await tx.category.createMany({
              data: DEFAULT_CATEGORIES.map(cat => ({
                userId: newUser.id,
                name: cat.name,
                type: cat.type,
                icon: cat.icon,
                isCustom: false,
              })),
            });

            await tx.financialScore.create({
              data: {
                userId: newUser.id,
                totalScore: 0,
                incomeVsOutcomeScore: 0,
                planningAdherenceScore: 0,
                investmentScore: 0,
                historyConsistencyScore: 0,
                monthYear: currentMonthYear,
              },
            });

            return newUser;
          });
        }

        await createSession(dbUser.name, dbUser.id, dbUser.email);

        return true;
      } catch (error) {
        console.error("Erro ao autenticar utilizador do Google na base de dados:", error);
        return false;
      }
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/home`;
    },
  },
});
