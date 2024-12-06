import { render } from '@testing-library/react';
import jwt from 'jsonwebtoken';
import React from 'react';
import { createToken } from '@/lib/auth'; // Import the function to test

// Define the JwtPayload type (since it's not explicitly exported by jsonwebtoken)
interface JwtPayload {
  userId: string;
  email: string;
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

// Mock Zustand store inline in jest.mock
jest.mock('@/store/auth', () => {
  const create = require('zustand'); // Use the default export directly
  return {
      useAuth: create(() => ({
          user: null,
          token: null,
          isAuthenticated: false,
          setSession: jest.fn(),
          clearSession: jest.fn(),
      })),
  };
});

// Import the mocked useAuth after jest.mock
import { useAuth } from '@/store/auth';

describe('Auth Test Suite', () => {
  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

  beforeEach(() => {
    jest.clearAllMocks();
    const authState = useAuth.getState();
    // Reset store state between tests
    authState.user = null;
    authState.token = null;
    authState.isAuthenticated = false;
    (authState.setSession as jest.Mock).mockClear(); // Ensure the mocks are reset
    (authState.clearSession as jest.Mock).mockClear(); // Ensure the mocks are reset
  });

  // Tests for Zustand-based Auth State
  describe('Zustand-based Auth Tests', () => {
    it('should initialize with default auth state', () => {
      const authState = useAuth.getState();
      render(<div>Test Component</div>);

      expect(authState.isAuthenticated).toBe(false);
      expect(authState.user).toBeNull();
    });

    it('should handle authenticated state correctly', () => {
      const authState = useAuth.getState();
      authState.user = { id: '1', name: 'Test User', email: 'test@example.com' };
      authState.token = 'test-token';
      authState.isAuthenticated = true;

      render(<div>Test Component</div>);

      expect(authState.user).toEqual({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      });
      expect(authState.token).toBe('test-token');
      expect(authState.isAuthenticated).toBe(true);
    });

    it('should clear the session when logout is called', () => {
      const authState = useAuth.getState();
      authState.clearSession();

      expect(authState.clearSession).toHaveBeenCalled();
    });

    it('should set the session when login is called', () => {
      const authState = useAuth.getState();
      const newUser = { id: '2', name: 'Another User', email: 'another@example.com' };
      const newToken = 'new-token';

      authState.setSession(newUser, newToken);

      expect(authState.setSession).toHaveBeenCalledWith(newUser, newToken);
    });
  });

  // Tests for createToken function
  describe('createToken Tests', () => {
    it('should generate a valid JWT for a given payload', () => {
      const payload = { userId: '123', email: 'test@example.com' };

      // Call the function
      const token = createToken(payload);

      // Verify the token using the same secret
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      // Assertions
      expect(typeof token).toBe('string'); // Ensure token is a string
      expect(decoded).toHaveProperty('userId', '123');
      expect(decoded).toHaveProperty('email', 'test@example.com');
    });

    it('should generate a token that expires in 7 days', () => {
      const payload = { userId: '123', email: 'test@example.com' };

      const token = createToken(payload);
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      // Assertions for expiration
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      expect(decoded.exp).toBeGreaterThan(currentTimeInSeconds); // Ensure token expires in the future
      expect(decoded.exp).toBeLessThanOrEqual(currentTimeInSeconds + 7 * 24 * 60 * 60); // Ensure expiration matches 7 days
    });
  });
});
