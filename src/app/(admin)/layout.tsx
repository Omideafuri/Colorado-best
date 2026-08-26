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
    <div className="min-h-screen bg-[#FAF8EE] text-[#2A1A08] selection:bg-[#A4530C] selection:text-white">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-l border-white/10 bg-[#231506] text-[#FAF8EE] shadow-2xl z-30">
        {/* Logo */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-white/10 bg-[#160D04]/60">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="diamond-motif !w-2 !h-2 group-hover:rotate-90 transition-transform duration-500 shadow-floating-amber" />
            <div>
              <span className="text-sm tracking-brand font-bold text-white block">ZARAVI</span>
              <span className="text-[10px] text-[#EEE9C1] font-medium">میز مدیریت ارشد</span>
            </div>
          </Link>
          <Shield className="h-4 w-4 text-[#A4530C]" />
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
                        ? 'bg-[#A4530C] text-white shadow-floating-amber'
                        : 'text-[#DDD7B5] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={`h-4 w-4 flex-shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-[#DDD7B5] group-hover:text-white'
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
        <div className="border-t border-white/10 p-4 bg-[#160D04]/60">
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl text-xs text-[#DDD7B5] hover:text-white hover:bg-white/10 transition-colors duration-300 cursor-pointer"
            >
              <LogOut className="h-4 w-4 text-[#A4530C]" />
              <span>خروج از پنل مدیریت</span>
            </button>
          </form>
        </div>
      </aside>

      <main className="md:mr-64 pb-24 md:pb-0">
        {/* Admin Top Bar */}
        <header className="sticky top-0 z-20 h-16 border-b border-[#DFD7B5] bg-[#FAF8EE]/90 backdrop-blur-md flex items-center justify-between px-6 md:px-10 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="diamond-motif !w-1.5 !h-1.5" />
            <h1 className="text-xs tracking-brand font-bold text-[#3A230A]">
              سامانه جامع نظارت و راهبری زروی
            </h1>
          </div>
          <span className="text-[10px] font-mono bg-white border border-[#DFD7B5] px-2.5 py-1 rounded-full text-[#8C775D] shadow-floating-sm">
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
