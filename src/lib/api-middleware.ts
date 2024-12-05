// src/lib/api-middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';

export function withAuth(handler: Function) {
  return async (req: NextRequest) => {
    try {
      const token = req.headers.get('authorization')?.split(' ')[1];
      
      if (!token) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        );
      }

      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'your-secret-key'
      );

      // Add user info to the request
      req.headers.set('userId', (decoded as any).userId);
      
      return handler(req);
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }
  };
}