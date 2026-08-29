import { getSession } from '../session';
import { getCategoriesUser } from './queries';

export async function getAuthedCategories() {
  const session = await getSession();

  if (!session?.userId) {
    return [];
  }

  return getCategoriesUser(session.userId);
}
