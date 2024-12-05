// src/hooks/useAuth.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: null | {
    id: string;
    email: string;
    name: string;
  };
  token: string | null;
  setSession: (user: any, token: string) => void;
  clearSession: () => void;
  isAuthenticated: boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setSession: (user, token) => 
        set({ user, token, isAuthenticated: true }),
      clearSession: () => 
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);