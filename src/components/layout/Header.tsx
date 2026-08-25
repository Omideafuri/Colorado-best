'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { logoutAction } from '@/app/(auth)/actions';

type UserType = {
  id: string;
  role: string;
  profile?: { firstName: string | null; lastName: string | null } | null;
} | null;

const editorialNavItems = [
  { label: 'خانه', href: '/' },
  { label: 'قیمت طلا', href: '/prices' },
  { label: 'فروشگاه طلا', href: '/store' },
  { label: 'درباره زروی', href: '/about' },
  { label: 'سوالات متداول', href: '/faq' },
];

export function Header({ user }: { user?: UserType }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            ? 'bg-surface/90 backdrop-blur-md border-b border-border py-4'
            : 'bg-transparent border-b border-transparent py-6'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-3">
              <span className="diamond-motif !w-2.5 !h-2.5" />
              <span className="text-xl tracking-brand font-bold text-text-primary">
                ZARAVI
              </span>
            </Link>

            {/* Desktop Navigation — Center */}
            <nav className="hidden lg:flex items-center gap-8 bg-surface-secondary/80 backdrop-blur-sm border border-border/80 px-8 py-2.5 rounded-full">
              {editorialNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions — Left (RTL layout) */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/dashboard"
                    className="text-xs font-medium bg-surface-dark text-white px-6 py-2.5 rounded-full hover:bg-black transition-all duration-300 flex items-center gap-2"
                  >
                    <span>داشبورد</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="text-xs text-text-muted hover:text-text-primary transition-colors duration-300"
                    >
                      خروج
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-300 px-4 py-2"
                  >
                    ورود
                  </Link>
                  <Link
                    href="/register"
                    className="text-xs font-medium bg-surface-dark text-white px-6 py-2.5 rounded-full hover:bg-black transition-all duration-300 flex items-center gap-2 shadow-sm"
                  >
                    <span>افتتاح حساب</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-primary bg-surface/80"
              aria-label={isMobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Immersive Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-surface-secondary/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] lg:hidden ${
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
                className="text-2xl font-semibold text-text-primary hover:text-gold-600 transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-14 flex flex-col items-center gap-4 w-full max-w-xs">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center bg-surface-dark text-white py-3.5 text-xs font-medium rounded-full hover:bg-black transition-colors"
                >
                  ورود به داشبورد
                </Link>
                <form action={logoutAction} className="w-full">
                  <button
                    type="submit"
                    className="w-full text-center border border-border text-text-secondary py-3.5 text-xs rounded-full hover:text-text-primary transition-colors"
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
                  className="w-full text-center bg-surface-dark text-white py-3.5 text-xs font-medium rounded-full hover:bg-black transition-colors"
                >
                  ساخت حساب
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center border border-border text-text-primary py-3.5 text-xs rounded-full hover:bg-surface-hover transition-colors"
                >
                  ورود
                </Link>
              </>
            )}
          </div>

          <div className="mt-14 flex items-center gap-4">
            <div className="w-8 h-px bg-border" />
            <span className="diamond-motif" />
            <div className="w-8 h-px bg-border" />
          </div>
        </div>
      </div>
    </>
  );
}
