'use server';

import { createSession } from '@/lib/session';
import { LoginInput, loginSchema } from '@/schemas/auth/auth.schema';
import { AuthService } from '@/services/auth/auth.service';
import { redirect } from 'next/navigation';

type ActionResponse = {
  success?: boolean;
  errors?: Record<string, string>;
  message?: string;
};

export async function loginAction(data: LoginInput): Promise<ActionResponse> {
  const validation = loginSchema.safeParse(data);

  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};

    validation.error.issues.forEach(issue => {
      if (issue.path[0]) {
        fieldErrors[issue.path[0].toString()] = issue.message;
      }
    });

    return {
      success: false,
      errors: fieldErrors,
    };
  }

  try {
    const user = await AuthService.login(validation.data);

    await createSession(user.id, user.email);
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Erro ao realizar login. Tente novamente.',
    };
  }
  redirect('/home');
}
