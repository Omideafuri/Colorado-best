'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mobileNavItems, type NavItem } from '@/config/navigation';
import { cn } from '@/lib/utils';

export interface MobileNavProps {
  items?: NavItem[];
  ariaLabel?: string;
}

export function MobileNav({ items = mobileNavItems, ariaLabel = 'ناوبری اصلی موبایل' }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={ariaLabel}
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#14182E]/95 backdrop-blur-xl border-t border-white/10 px-4 py-2 shadow-2xl"
    >
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/admin' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200',
                isActive
                  ? 'text-[#B35817] font-bold'
                  : 'text-[#C7C0B3] hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.titleFa}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
