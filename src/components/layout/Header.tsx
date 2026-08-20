'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogIn, LayoutDashboard, LogOut } from 'lucide-react';
import { publicNavItems } from '@/config/navigation';
import { logoutAction } from '@/app/(auth)/actions';
import { Button } from '@/components/ui/button';

type UserType = {
  id: string;
  role: string;
  profile?: { firstName: string | null; lastName: string | null } | null;
} | null;

export function Header({ user }: { user?: UserType }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-light bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500 text-white font-bold text-lg">
              ز
            </div>
            <span className="text-lg font-bold text-text-primary">
              زروی
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
              >
                {item.titleFa}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-text-secondary hidden lg:block">
                  {user.profile?.firstName} عزیز، خوش آمدید
                </span>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-lg bg-surface-secondary border border-border px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  داشبورد
                </Link>
                <form action={logoutAction}>
                  <Button
                    type="submit"
                    variant="icon"
                    size="icon"
                    title="خروج"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  ورود
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-5 py-2 text-sm font-semibold text-white hover:bg-gold-600 transition-colors shadow-sm"
                >
                  ثبت‌نام
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="icon"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            aria-label={isMobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border-light py-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {publicNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  {item.titleFa}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3 px-3 border-t border-border-light pt-4">
              {user ? (
                <>
                  <div className="text-sm font-medium text-text-primary px-3 mb-2">
                    {user.profile?.firstName} {user.profile?.lastName}
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 w-full text-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    ورود به داشبورد
                  </Link>
                  <form action={logoutAction} className="w-full">
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
                </>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 text-center rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors"
                  >
                    ورود
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 text-center rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
                  >
                    ثبت‌نام
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
