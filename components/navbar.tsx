'use client';

import Link from 'next/link';
import { UserButton } from './user-button';
import ThemeToggle from './shared/theme-toggle';

export default function Navbar() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-lg font-semibold">
            E-Commerce
          </Link>
          <Link
            href="/products"
            className="text-muted-foreground hover:text-foreground"
          >
            Products
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
