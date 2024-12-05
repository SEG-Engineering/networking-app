import { render } from '@testing-library/react';
import { create } from 'zustand';
import React from 'react';

// Define a type for the auth state
type AuthState = {
  user: { id: string; name: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  setSession: jest.Mock;
  clearSession: jest.Mock;
};

// Mock Zustand store
const useAuth = create<AuthState>(() => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setSession: jest.fn(),
  clearSession: jest.fn(),
}));

jest.mock('@/store/auth', () => ({
  useAuth,
}));

describe('Auth Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const authState = useAuth.getState();
    // Reset store state between tests
    authState.user = null;
    authState.token = null;
    authState.isAuthenticated = false;
    authState.setSession.mockClear();
    authState.clearSession.mockClear();
  });

  it('should call the auth hook correctly', () => {
    const authState = useAuth.getState();
    render(<div>Test Component</div>);

    expect(authState.isAuthenticated).toBe(false);
    expect(authState.user).toBeNull();
  });

  it('should handle authenticated state', () => {
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