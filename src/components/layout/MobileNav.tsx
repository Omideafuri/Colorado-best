'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mobileNavItems } from '@/config/navigation';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#262A56]/95 backdrop-blur-xl md:hidden text-white shadow-2xl">
      <div className="flex items-center justify-around py-2.5 px-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-300 min-w-0 ${
                isActive
                  ? 'text-[#E3CCAE] font-semibold bg-[#1A1D3D] border border-white/10 shadow-xs'
                  : 'text-[#C5BFB4] hover:text-white'
              }`}
            >
              <item.icon className={`h-4 w-4 ${isActive ? 'text-[#B8621B]' : 'text-[#C5BFB4]'}`} />
              <span className="text-[10px] truncate">
                {item.titleFa}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area for mobile home bar */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
}
