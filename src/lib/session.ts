'use server';

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const Secret_Key = new TextEncoder().encode(process.env.JWT_SECRET);

type SessionPayload = {
  name?: string | null;
  userId: string;
  email: string;
};

export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(Secret_Key);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, Secret_Key, {
      algorithms: ['HS256'],
    });
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}

export async function createSession(
  name: string | null,
  userId: string,
  email: string,
) {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const formatedName = name || 'usuário';
  const token = await encrypt({ name: formatedName, userId, email });

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
      return null;
    }

    const payload = await decrypt(token);
    return payload;
  } catch (error) {
    console.error('Erro ao recuperar sessão:', error);
    return null;
  }
}
