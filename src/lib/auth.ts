// src/lib/auth.ts
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JWTPayload {
  userId: string;
  email: string;
}

export function createToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export async function verifyAuth(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    let token = authHeader?.split(' ')[1];

    if (!token) {
      const cookieStore = await cookies();
      token = cookieStore.get('auth-token')?.value;
    }

    if (!token) {
      return { success: false, error: 'No token provided' };
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return {
      success: true,
      userId: decoded.userId,
      email: decoded.email
    };
  } catch (error) {
    return { success: false, error: 'Invalid token' };
  }
}