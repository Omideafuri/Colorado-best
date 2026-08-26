import React from 'react';
import { cn } from '@/lib/utils';

export interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
  className?: string;
}

export function BentoCard({
  title,
  description,
  icon,
  tag,
  className,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        'bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8E2D7] shadow-subtle hover:border-[#B35817]/50 hover:shadow-card transition-all duration-500 flex flex-col justify-between',
        className
      )}
    >
      <div>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F3EFE6] flex items-center justify-center text-[#14182E] mb-5 sm:mb-6 border border-[#E8E2D7]">
          {icon}
        </div>

        {tag && (
          <span className="text-[10px] tracking-brand font-bold text-[#B35817] block mb-1 uppercase">
            {tag}
          </span>
        )}

        <h3 className="text-base sm:text-lg font-bold text-[#161412] mb-2">{title}</h3>

        <p className="text-xs text-[#4A453E] leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}
