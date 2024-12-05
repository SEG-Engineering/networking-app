// src/components/UserProfileDropdown.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, clearSession } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      clearSession();
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to logout');
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        className="relative h-8 w-8 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="p-2">
            <div className="px-4 py-2">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <div className="h-px bg-gray-200 my-2" />
            <button 
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-md flex items-center"
              onClick={() => {
                router.push('/settings');
                setIsOpen(false);
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </button>
            <button 
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center"
              onClick={handleLogout}
              disabled={isLoading}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}