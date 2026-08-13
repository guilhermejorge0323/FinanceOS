import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface ActionResponse<T> {
  success?: boolean;
  data: T;
  error?: string;
}

export async function fetchWithAuth<T>(
  action: () => Promise<ActionResponse<T>>,
  router: AppRouterInstance,
): Promise<T | null> {
  const res = await action();

  if (!res.success && res.error === 'UNAUTHORIZED') {
    router.push('/auth');
    return null;
  }

  return res.success ? res.data : null;
}
