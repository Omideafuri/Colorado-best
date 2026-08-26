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
        'floating-card p-6 sm:p-8 flex flex-col justify-between',
        className
      )}
    >
      <div>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#EEE9C1] flex items-center justify-center text-[#3A230A] mb-5 sm:mb-6 border border-[#DFD7B5]">
          {icon}
        </div>

        {tag && (
          <span className="text-[10px] tracking-brand font-bold text-[#A4530C] block mb-1 uppercase">
            {tag}
          </span>
        )}

        <h3 className="text-base sm:text-lg font-bold text-[#2A1A08] mb-2">{title}</h3>

        <p className="text-xs text-[#57442D] leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}
