'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Shield } from 'lucide-react';
import { adminNavItems } from '@/config/navigation';
import { logoutAction } from '@/app/(auth)/actions';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-l border-border bg-surface">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-white">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-text-primary">پنل مدیریت</span>
            <span className="block text-xs text-text-muted">زروی</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {item.titleFa}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-3">
          <form action={logoutAction}>
            <Button
              type="submit"
              variant="danger"
              size="sm"
              className="w-full"
              icon={<LogOut className="h-4 w-4" />}
            >
              خروج
            </Button>
          </form>
        </div>
      </aside>

      <main className="md:mr-64">
        {/* Admin Top Bar */}
        <header className="sticky top-0 z-40 h-16 border-b border-border bg-surface/95 backdrop-blur-sm flex items-center px-6">
          <h1 className="text-sm font-semibold text-text-primary">
            پنل مدیریت زروی
          </h1>
        </header>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
