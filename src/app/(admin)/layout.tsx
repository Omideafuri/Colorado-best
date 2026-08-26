'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Shield } from 'lucide-react';
import { adminNavItems, adminMobileNavItems } from '@/config/navigation';
import { logoutAction } from '@/app/(auth)/actions';
import { MobileNav } from '@/components/layout/MobileNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#161412] selection:bg-[#B35817] selection:text-white">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-l border-white/10 bg-[#14182E] text-[#FAF8F4] shadow-2xl z-30">
        {/* Logo */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-white/10 bg-[#0C0E1A]/60">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="diamond-motif !w-2 !h-2 group-hover:rotate-90 transition-transform duration-500 shadow-copper-glow" />
            <div>
              <span className="text-sm tracking-brand font-bold text-white block">ZARAVI</span>
              <span className="text-[10px] text-[#EBD8C1] font-medium">میز مدیریت ارشد</span>
            </div>
          </Link>
          <Shield className="h-4 w-4 text-[#B35817]" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3.5 space-y-1">
          <ul className="space-y-1">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 group ${
                      isActive
                        ? 'bg-[#B35817] text-white shadow-copper-glow'
                        : 'text-[#C7C0B3] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={`h-4 w-4 flex-shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-[#C7C0B3] group-hover:text-white'
                        }`}
                      />
                      <span>{item.titleFa}</span>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-4 bg-[#0C0E1A]/60">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl text-xs text-[#C7C0B3] hover:text-white hover:bg-white/10 transition-colors duration-300 cursor-pointer"
            >
              <LogOut className="h-4 w-4 text-[#B35817]" />
              <span>خروج از پنل مدیریت</span>
            </button>
          </form>
        </div>
      </aside>

      <main className="md:mr-64 pb-24 md:pb-0">
        {/* Admin Top Bar */}
        <header className="sticky top-0 z-20 h-16 border-b border-[#E8E2D7] bg-white/90 backdrop-blur-md flex items-center justify-between px-6 md:px-10 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="diamond-motif !w-1.5 !h-1.5" />
            <h1 className="text-xs tracking-brand font-bold text-[#14182E]">
              سامانه جامع نظارت و راهبری زروی
            </h1>
          </div>
          <span className="text-[10px] font-mono bg-[#FAF8F4] border border-[#E8E2D7] px-2.5 py-1 rounded-full text-[#7E776C]">
            ADMIN CONSOLE
          </span>
        </header>

        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>

      <MobileNav items={adminMobileNavItems} ariaLabel="ناوبری پنل مدیریت" />
    </div>
  );
}
