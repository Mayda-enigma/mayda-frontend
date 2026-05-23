import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('mayda_token')?.value;
  const { pathname } = request.nextUrl;

  if (!token && !publicPaths.includes(pathname)) {
    const next = encodeURIComponent(pathname);
    return NextResponse.redirect(new URL(`/login?next=${next}`, request.url));
  }

  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
