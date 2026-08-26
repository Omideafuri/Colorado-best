'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowLeft, TrendingUp } from 'lucide-react';
import { logoutAction } from '@/app/(auth)/actions';

type UserType = {
  id: string;
  role: string;
  profile?: { firstName: string | null; lastName: string | null } | null;
} | null;

const navItems = [
  { label: 'خانه', href: '/' },
  { label: 'تابلوی نرخ‌ها', href: '/prices' },
  { label: 'فروشگاه طلا', href: '/store' },
  { label: 'درباره زروی', href: '/about' },
  { label: 'مرکز راهنمایی', href: '/faq' },
];

export function Header({ user }: { user?: UserType }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? 'bg-[#3A230A]/92 backdrop-blur-xl border-b border-white/10 py-3 shadow-floating-umber'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Hallmark */}
            <Link href="/" className="relative z-10 flex items-center gap-2.5 group">
              <span className="diamond-motif !w-2.5 !h-2.5 group-hover:rotate-90 transition-transform duration-500 shadow-floating-amber" />
              <span className="text-lg sm:text-xl tracking-brand font-bold text-white group-hover:text-[#EEE9C1] transition-colors">
                ZARAVI
              </span>
            </Link>

            {/* Desktop Center Navigation Pill */}
            <nav className="hidden lg:flex items-center gap-7 bg-[#3A230A]/85 backdrop-blur-md border border-[#EEE9C1]/15 px-7 py-2 rounded-full shadow-floating-sm">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium text-[#EEE9C1] hover:text-white transition-colors duration-300 relative py-1"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="text-xs font-semibold floating-btn-amber px-5 py-2.5 rounded-full flex items-center gap-2"
                  >
                    <span>میز دارایی</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="text-xs text-[#DDD7B5] hover:text-white transition-colors duration-300 px-2 py-1 cursor-pointer"
                    >
                      خروج
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-xs font-medium text-[#EEE9C1] hover:text-white transition-colors duration-300 px-3.5 py-2"
                  >
                    ورود
                  </Link>
                  <Link
                    href="/register"
                    className="text-xs font-semibold floating-btn-amber px-5 py-2.5 rounded-full flex items-center gap-2"
                  >
                    <span>افتتاح حساب</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#EEE9C1] bg-[#3A230A]/90 shadow-floating-sm"
              aria-label={isMobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 text-white" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Immersive Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#231506]/98 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-center items-center min-h-screen px-6">
          <nav className="flex flex-col items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl sm:text-2xl font-bold text-[#EEE9C1] hover:text-white transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-12 flex flex-col items-center gap-3.5 w-full max-w-xs">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center floating-btn-amber py-3.5 text-xs font-semibold rounded-full"
                >
                  ورود به میز دارایی
                </Link>
                <form action={logoutAction} className="w-full">
                  <button
                    type="submit"
                    className="w-full text-center border border-white/20 text-[#DDD7B5] py-3 text-xs rounded-full hover:text-white transition-colors cursor-pointer"
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
                  className="w-full text-center floating-btn-amber py-3.5 text-xs font-semibold rounded-full"
                >
                  افتتاح حساب آنلاین
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center border border-[#EEE9C1] text-[#EEE9C1] py-3 text-xs rounded-full hover:bg-[#EEE9C1] hover:text-[#3A230A] transition-colors"
                >
                  ورود اعضا
                </Link>
              </>
            )}
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div className="w-6 h-px bg-white/20" />
            <span className="diamond-motif !w-2 !h-2" />
            <div className="w-6 h-px bg-white/20" />
          </div>
        </div>
      </div>
    </>
  );
}
