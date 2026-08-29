import { prisma } from '@/lib/prisma';

export class CategoriesService {
  static async getUserCategories(userId: string) {
    return await prisma.category.findMany({
      where: { userId: userId },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
