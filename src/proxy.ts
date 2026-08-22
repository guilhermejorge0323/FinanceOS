import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  if (!token && pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (token && pathname === '/auth') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/auth'],
};
