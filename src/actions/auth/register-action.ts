'use server';

import { createSession } from '@/lib/session';
import { RegisterInput, registerSchema } from '@/schemas/auth/auth.schema';
import { AuthService } from '@/services/auth/auth.service';
import { redirect } from 'next/navigation';


export type ActionResponse = {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
};

export async function registerAction(
  data: RegisterInput,
): Promise<ActionResponse> {
  const validation = registerSchema.safeParse(data);

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
    const user = await AuthService.register(validation.data);

    await createSession(user.id, user.email);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('e-mail')) {
        return {
          success: false,
          errors: {
            email: error.message,
          },
        };
      }

      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: 'Erro ao criar conta',
    };
  }

  redirect('/home');
}
