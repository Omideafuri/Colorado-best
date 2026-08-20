'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { dashboardNavItems } from '@/config/navigation';
import { logoutAction } from '@/app/(auth)/actions';
import { Button } from '@/components/ui/button';

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-l border-border bg-surface">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 text-white font-bold">
          ز
        </div>
        <span className="text-lg font-bold text-text-primary">زروی</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {dashboardNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gold-50 text-gold-700 border border-gold-200'
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
            icon={<LogOut className="h-4 w-4" />}
            className="w-full"
          >
            خروج از حساب
          </Button>
        </form>
      </div>
    </aside>
  );
}
