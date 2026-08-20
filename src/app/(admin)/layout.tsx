'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Shield } from 'lucide-react';
import { adminNavItems } from '@/config/navigation';
import { logoutAction } from '@/app/(auth)/actions';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-l border-border bg-surface">
        {/* Logo */}
        <div className="flex h-20 items-center gap-3 px-6 border-b border-border">
          <Shield className="h-4 w-4 text-text-muted" />
          <div>
            <span className="text-xs tracking-brand font-semibold text-text-primary block">ZARAVI</span>
            <span className="text-xs text-text-muted">پنل مدیریت</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-0.5">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-300 ${
                      isActive
                        ? 'text-text-primary font-medium bg-surface-secondary'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {item.titleFa}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-border p-4">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-text-muted hover:text-danger transition-colors duration-300"
            >
              <LogOut className="h-4 w-4" />
              خروج
            </button>
          </form>
        </div>
      </aside>

      <main className="md:mr-60">
        {/* Admin Top Bar */}
        <header className="sticky top-0 z-40 h-16 border-b border-border bg-surface/95 backdrop-blur-lg flex items-center px-6 md:px-10">
          <h1 className="text-xs tracking-brand text-text-muted">
            پنل مدیریت
          </h1>
        </header>

        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
