// src/components/auth/LogoutButton.tsx

"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  const { clearSession } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
      className="text-red-600 hover:text-red-700"
    >
      Logout
    </Button>
  );
}