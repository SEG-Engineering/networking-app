// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/lib/auth";

const publicPaths = ['/api/auth/login', '/api/auth/register', '/login', '/register'];

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

  // Add user info to headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('userId', authResult.userId);

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