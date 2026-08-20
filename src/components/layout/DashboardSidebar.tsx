'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { dashboardNavItems } from '@/config/navigation';
import { logoutAction } from '@/app/(auth)/actions';

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-l border-border bg-surface">
      {/* Logo */}
      <div className="flex h-20 items-center px-6 border-b border-border">
        <Link href="/" className="text-sm tracking-brand font-semibold text-text-primary">
          ZARAVI
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <ul className="space-y-0.5">
          {dashboardNavItems.map((item) => {
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
            خروج از حساب
          </button>
        </form>
      </div>
    </aside>
  );
}
