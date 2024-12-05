// src/providers/SessionProvider.tsx
"use client";

import { useSessionTimeout } from '@/lib/session';

export function SessionProvider({ children }: { children: React.ReactNode }) {
  useSessionTimeout();
  return <>{children}</>;
}