// src/lib/session.ts
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export function useSessionTimeout() {
  const { clearSession, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) return;

    let timeoutId: NodeJS.Timeout;
    let activityTimeoutId: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        clearSession();
        router.push('/login');
        toast.info('Session expired. Please login again.');
      }, SESSION_TIMEOUT);
    };

    const handleActivity = () => {
      clearTimeout(activityTimeoutId);
      activityTimeoutId = setTimeout(resetTimeout, 1000);
    };

    // Events to track user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(activityTimeoutId);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [isAuthenticated, clearSession, router]);
}