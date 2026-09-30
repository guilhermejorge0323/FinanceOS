'use server';

import { getSession } from '@/lib/session';
import { categorySchema } from '@/schemas/category/category-schema';
import { CategoriesService } from '@/services/categories/categories.service';
import { revalidatePath, revalidateTag } from 'next/cache';

export type CreateCategoryInput = {
  name: string;
  type: 'INCOME' | 'OUTCOME';
  icon: string;
};

export async function createCategoryAction(data: CreateCategoryInput) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
      };
    }

    const validation = categorySchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        error: 'Dados inválidos.',
      };
    }

    const { name, type, icon } = validation.data;

    const newCategory = await CategoriesService.createUserCategory({
      userId: session?.userId,
      name,
      type,
      icon,
    });

    revalidateTag(`categories-${session.userId}`, '');
    revalidatePath('/home');

    return {
      success: true,
      data: newCategory,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Erro ao criar categoria.' };
  }
}
