"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="border-b mb-4">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Contact Manager</h1>
          <div className="space-x-4">
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
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar