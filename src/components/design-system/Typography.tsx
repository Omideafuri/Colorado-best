import React from 'react';
import { cn } from '@/lib/utils';
import { toPersianDigits, formatNumber } from '@/lib/utils/format';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'display' | 'h1' | 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
  className?: string;
}

export function Heading({
  as: Component = 'h2',
  size = 'h2',
  children,
  className,
  ...props
}: HeadingProps) {
  const sizeClasses = {
    display: 'text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold leading-[1.08] tracking-tight',
    h1: 'text-[clamp(2rem,4.2vw,3.75rem)] font-bold leading-[1.14] tracking-tight',
    h2: 'text-[clamp(1.6rem,3vw,2.75rem)] font-bold leading-[1.22] tracking-tight',
    h3: 'text-[clamp(1.2rem,2vw,1.85rem)] font-semibold leading-[1.32]',
    h4: 'text-base sm:text-lg md:text-xl font-semibold leading-snug',
  }[size];

  return (
    <Component className={cn('text-[#2A1A08]', sizeClasses, className)} {...props}>
      {children}
    </Component>
  );
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'lead' | 'body' | 'sm' | 'xs';
  muted?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Text({
  size = 'body',
  muted = false,
  children,
  className,
  ...props
}: TextProps) {
  const sizeClasses = {
    lead: 'text-base sm:text-lg md:text-xl leading-relaxed font-light',
    body: 'text-xs sm:text-sm md:text-base leading-relaxed font-normal',
    sm: 'text-xs sm:text-sm leading-normal',
    xs: 'text-[11px] sm:text-xs leading-normal',
  }[size];

  return (
    <p
      className={cn(
        muted ? 'text-[#57442D] font-light' : 'text-[#2A1A08]',
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export interface PriceDisplayProps {
  toman: number;
  rial?: number;
  unit?: string;
  showRial?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'display';
  className?: string;
}

export function PriceDisplay({
  toman,
  rial,
  unit = 'تومان',
  showRial = true,
  size = 'md',
  className,
}: PriceDisplayProps) {
  const rialValue = rial ?? toman * 10;

  const sizeClasses = {
    sm: 'text-sm font-bold',
    md: 'text-base sm:text-lg font-bold',
    lg: 'text-xl sm:text-2xl md:text-3xl font-extrabold',
    display: 'text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight',
  }[size];

  return (
    <div className={cn('flex flex-col items-start', className)}>
      <div className="flex items-baseline gap-1 font-num">
        <span className={cn('text-[#2A1A08] font-num', sizeClasses)}>
          {toPersianDigits(formatNumber(toman))}
        </span>
        <span className="text-xs font-normal text-[#8C775D]">{unit}</span>
      </div>

      {showRial && unit !== 'دلار' && (
        <span className="text-[11px] font-num text-[#8C775D] font-light mt-0.5">
          معادل {toPersianDigits(formatNumber(rialValue))} ریال
        </span>
      )}
    </div>
  );
}

export interface MicroLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  motif?: 'diamond' | 'dot' | 'none';
  className?: string;
}

export function MicroLabel({
  children,
  motif = 'diamond',
  className,
  ...props
}: MicroLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 text-[11px] tracking-brand font-semibold text-[#8C775D] uppercase',
        className
      )}
      {...props}
    >
      {motif === 'diamond' && <span className="diamond-motif !w-1.5 !h-1.5" />}
      {motif === 'dot' && <span className="w-1.5 h-1.5 rounded-full bg-[#A4530C]" />}
      <span>{children}</span>
    </div>
  );
}
