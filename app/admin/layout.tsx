import ThemeToggle from '@/components/shared/theme-toggle';
import { UserButton } from '@/components/user-button';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-lg font-semibold">
              E-Commerce
            </Link>
          </nav>
          <div className="flex flex-row space-x-4">
            <ThemeToggle />
            <UserButton />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
