'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardNavItems } from '@/config/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#14182E] text-white border-l border-white/10 flex flex-col justify-between p-6 shrink-0 min-h-screen">
      <div>
        {/* Brand Link */}
        <Link href="/dashboard" className="flex items-center gap-2.5 mb-8 group">
          <span className="diamond-motif !w-2.5 !h-2.5 group-hover:rotate-90 transition-transform duration-500 shadow-copper-glow" />
          <span className="text-lg tracking-brand font-bold text-white group-hover:text-[#EBD8C1] transition-colors">
            ZARAVI
          </span>
        </Link>

        {/* Navigation Items */}
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
                    ? 'bg-[#B35817] text-white shadow-copper-glow'
                    : 'text-[#C7C0B3] hover:text-white hover:bg-white/10'
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
      </div>

      {/* Vault Status Pod */}
      <div className="bg-[#0C0E1A] p-4 rounded-2xl border border-white/10 text-xs">
        <div className="flex items-center gap-2 text-[#EBD8C1] font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#B35817]" />
          <span>پشتوانه ۱۰۰٪ بیمه‌شده</span>
        </div>
        <p className="text-[11px] text-[#C7C0B3] leading-relaxed font-light">
          تمام موجودی طلای شما در صندوق‌های امن بانکی نگهداری می‌شود.
        </p>
      </div>
    </aside>
  );
}
