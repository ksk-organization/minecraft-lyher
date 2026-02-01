// resources/js/components/layout/AdminLayout.tsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Navbar */}
      <header className="border-b border-white/5 bg-[#121212] backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 text-xl font-black">
            <span className="text-orange-500">NOMROTI</span>
            <span className="text-muted-foreground font-normal text-base">Admin Panel</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Logged in as <strong className="text-white">Admin</strong>
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Logout</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
