'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { UserMenu } from './user-menu';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-lg font-semibold">
            E-Commerce
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-blue-600">
            Products
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <UserMenu />
          ) : (
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
} 