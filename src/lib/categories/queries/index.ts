'use cache';

import { CategoriesService } from '@/services/categories/categories.service';
import { cacheTag } from 'next/cache';

export async function getCategoriesUser(userId: string) {
  cacheTag(`categories-${userId}`);

  const categories = await CategoriesService.getUserCategories(userId);

  return categories;
}
