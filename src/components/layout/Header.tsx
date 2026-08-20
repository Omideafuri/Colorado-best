'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogIn, LayoutDashboard, LogOut } from 'lucide-react';
import { publicNavItems } from '@/config/navigation';
import { logoutAction } from '@/app/(auth)/actions';

type UserType = {
  id: string;
  role: string;
  profile?: { firstName: string | null; lastName: string | null } | null;
} | null;

const editorialNavItems = [
  { label: 'فروشگاه', href: '/store' },
  { label: 'قیمت طلا', href: '/prices' },
  { label: 'هنر ساخت', href: '/about' },
  { label: 'داستان ما', href: '/about' },
  { label: 'سوالات', href: '/faq' },
];

export function Header({ user }: { user?: UserType }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isScrolled
            ? 'bg-surface/90 backdrop-blur-lg border-b border-border'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <span className="text-lg tracking-brand font-semibold text-text-primary">
                ZARAVI
              </span>
            </Link>

            {/* Desktop Navigation — Center */}
            <nav className="hidden lg:flex items-center gap-10">
              {editorialNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions — Left */}
            <div className="hidden lg:flex items-center gap-6">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    داشبورد
                  </Link>
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="text-sm text-text-muted hover:text-text-primary transition-colors duration-300"
                    >
                      خروج
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    ورود
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm bg-surface-dark text-white px-6 py-2.5 hover:bg-black transition-colors duration-300"
                  >
                    حساب کاربری
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center text-text-primary"
              aria-label={isMobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Immersive Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-surface-secondary transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-center items-center min-h-screen px-8">
          <nav className="flex flex-col items-center gap-8 stagger-children">
            {editorialNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-semibold text-text-primary hover:text-gold-500 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-16 flex flex-col items-center gap-4 w-full max-w-xs">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-surface-dark text-white py-4 text-sm font-medium hover:bg-black transition-colors"
                >
                  ورود به داشبورد
                </Link>
                <form action={logoutAction} className="w-full">
                  <button
                    type="submit"
                    className="w-full text-center border border-border text-text-secondary py-4 text-sm hover:text-text-primary hover:border-text-primary transition-colors"
                  >
                    خروج از حساب
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-surface-dark text-white py-4 text-sm font-medium hover:bg-black transition-colors"
                >
                  ساخت حساب
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center border border-border text-text-primary py-4 text-sm hover:bg-surface-hover transition-colors"
                >
                  ورود
                </Link>
              </>
            )}
          </div>

          {/* Diamond Motif */}
          <div className="mt-16 flex items-center gap-4">
            <div className="w-px h-8 bg-border" />
            <span className="diamond-motif" />
            <div className="w-px h-8 bg-border" />
          </div>
        </div>
      </div>
    </>
  );
}
