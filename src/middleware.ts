// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/lib/auth";

const publicPaths = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/test-token', // Add this line
  '/login',
  '/register',
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow public paths
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  const authResult = await verifyAuth(request);

  if (!authResult.success) {
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Add user info to headers only if authResult.success is true
  const requestHeaders = new Headers(request.headers);

  if (authResult.userId) {
    requestHeaders.set('userId', authResult.userId);
  }

  if (authResult.email) {
    requestHeaders.set('email', authResult.email);
  }

  return NextResponse.next({
    headers: requestHeaders,
  });
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|favicon.ico|login|register).*)',
  ],
};
