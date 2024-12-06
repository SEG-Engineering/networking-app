import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

if (process.env.NODE_ENV === 'production' && JWT_SECRET === 'your-secret-key') {
  throw new Error('JWT_SECRET must be defined in the environment variables');
}

const AUTH_COOKIE_NAME = 'auth-token';

interface JWTPayload {
  userId: string;
  email: string;
}

/**
 * Creates a signed JWT token.
 * @param payload - The payload to include in the token.
 * @returns The signed JWT token.
 */
export function createToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Verifies the token from the request.
 * @param request - The Next.js request object.
 * @returns Decoded user information or error.
 */
export async function verifyAuth(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    let token = authHeader?.split(' ')[1];

    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    }

    if (!token) {
      return { success: false, error: 'No token provided' };
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return {
      success: true,
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return { success: false, error: 'Token has expired' };
    }
    return { success: false, error: 'Invalid token' };
  }
}
