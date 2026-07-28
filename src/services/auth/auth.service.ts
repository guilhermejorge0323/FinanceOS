import { prisma } from '@/lib/prisma';
import { LoginInput, RegisterInput } from '@/schemas/auth/auth.schema';
import bcrypt from 'bcryptjs';

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

    const newUser = await prisma.user.create({
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

    return newUser;
  }

  static async login(credentials: LoginInput) {
    const { email, password } = credentials;

    
  }
}
