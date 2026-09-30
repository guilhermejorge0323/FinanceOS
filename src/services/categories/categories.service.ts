import { prisma } from '@/lib/prisma';

export type CreateUserCategoryInput = {
  userId: string;
  name: string;
  icon: string;
  type: 'INCOME' | 'OUTCOME';
};

export class CategoriesService {
  static getUserCategories = async (userId: string) => {
    return await prisma.category.findMany({
      where: { userId: userId },
      orderBy: {
        name: 'asc',
      },
    });
  };

  static createUserCategory = async (data: CreateUserCategoryInput) => {
    const existingCategory = await prisma.category.findFirst({
      where: {
        userId: data.userId,
        name: {
          equals: data.name.trim(),
          mode: 'insensitive',
        },
        type: data.type,
      },
    });

    if (existingCategory) {
      throw new Error('Ja existe uma categoria com esse nome');
    }

    return await prisma.category.create({
      data: {
        userId: data.userId,
        name: data.name.trim(),
        icon: data.icon,
        type: data.type,
        isCustom: true,
      },
    });
  };
}
