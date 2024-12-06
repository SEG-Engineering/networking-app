import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

interface AuthState {
  user: User;
  token: string | null;
  isAuthenticated: boolean;
  setSession: (user: User, token: string) => void;
  clearSession: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('auth-user') || 'null'),
  token: localStorage.getItem('auth-token'),
  isAuthenticated: !!localStorage.getItem('auth-token'),

  setSession: (user, token) => {
    localStorage.setItem('auth-user', JSON.stringify(user));
    localStorage.setItem('auth-token', token);
    set({ user, token, isAuthenticated: true });
  },

  clearSession: () => {
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
