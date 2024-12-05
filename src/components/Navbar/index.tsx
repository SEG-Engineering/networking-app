// src/components/Navbar/index.tsx

"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import UserProfileDropdown from '@/components/ui/UserProfileDropdown'
import { useState } from 'react'
import { toast } from 'sonner'

const Navbar = () => {
  const pathname = usePathname()
  const { clearSession, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    clearSession()
    router.push('/login')
  }

  return (
    <nav className="border-b mb-4">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Contact Manager</h1>
          <div className="flex items-center space-x-4">
          {isAuthenticated ? (
  <>
    <Link href="/">
      <Button variant={pathname === '/' ? 'default' : 'outline'}>
        Add Contact
      </Button>
    </Link>
    <Link href="/dashboard">
      <Button variant={pathname === '/dashboard' ? 'default' : 'outline'}>
        Dashboard
      </Button>
    </Link>
    <Link href="/email-templates">
      <Button variant={pathname === '/email-templates' ? 'default' : 'outline'}>
        Email Templates
      </Button>
    </Link>
    <UserProfileDropdown />
  </>
) : (
              <>
                <Link href="/login">
                  <Button 
                    variant={pathname === '/login' ? 'default' : 'outline'}
                    disabled={isLoading}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    variant={pathname === '/register' ? 'default' : 'outline'}
                    disabled={isLoading}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar