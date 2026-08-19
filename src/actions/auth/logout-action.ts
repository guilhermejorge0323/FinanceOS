'use server';


import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function LogOutAction() {
  const cookiesStore = await cookies();

  cookiesStore.delete('session');

  redirect('/auth');
}
