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
        'bg-surface p-8 rounded-3xl border border-border shadow-xs hover:border-gold-500/40 hover:shadow-md transition-all duration-500 flex flex-col justify-between',
        className
      )}
    >
      <div>
        <div className="w-12 h-12 rounded-2xl bg-surface-secondary flex items-center justify-center text-gold-600 mb-6 border border-border">
          {icon}
        </div>

        {tag && (
          <span className="text-[10px] tracking-brand font-bold text-gold-600 block mb-1 uppercase">
            {tag}
          </span>
        )}

        <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>

        <p className="text-xs text-text-secondary leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}
