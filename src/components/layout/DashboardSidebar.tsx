'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardNavItems } from '@/config/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:right-0 border-l border-white/10 bg-[#231506] text-[#FAF8EE] shadow-2xl z-30">
      {/* Sidebar Header / Logo */}
      <div className="flex h-16 items-center px-6 border-b border-white/10 bg-[#160D04]/60">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <span className="diamond-motif !w-2.5 !h-2.5 group-hover:rotate-90 transition-transform duration-500 shadow-floating-amber" />
          <span className="text-lg tracking-brand font-bold text-white group-hover:text-[#EEE9C1] transition-colors">
            ZARAVI
          </span>
        </Link>
      </div>

      {/* Navigation & Status */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
        <nav className="space-y-1.5">
          {dashboardNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200',
                  isActive
                    ? 'bg-[#A4530C] text-white shadow-floating-amber'
                    : 'text-[#DDD7B5] hover:text-white hover:bg-white/10'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.titleFa}</span>
                </div>
                {isActive && <ArrowLeft className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>

        {/* Vault Status Pod */}
        <div className="bg-[#3A230A] p-4 rounded-2xl border border-white/10 text-xs shadow-floating-sm mt-6">
          <div className="flex items-center gap-2 text-[#EEE9C1] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#A4530C]" />
            <span>پشتوانه ۱۰۰٪ بیمه‌شده</span>
          </div>
          <p className="text-[11px] text-[#DDD7B5] leading-relaxed font-light">
            تمام موجودی طلای شما در صندوق‌های امن بانکی نگهداری می‌شود.
          </p>
        </div>
      </div>
    </aside>
  );
}
