import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'ivory' | 'white' | 'dark' | 'cream' | 'transparent';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: 'top' | 'bottom' | 'both' | 'none';
  containerSize?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  containerClassName?: string;
}

export function Section({
  children,
  variant = 'ivory',
  padding = 'lg',
  border = 'none',
  containerSize = 'lg',
  className,
  containerClassName,
  ...props
}: SectionProps) {
  const variantClasses = {
    ivory: 'bg-[#FAF8F5] text-text-primary',
    white: 'bg-bg-elevated text-text-primary',
    dark: 'bg-[#12100E] text-white',
    cream: 'bg-[#F4EFE6] text-text-primary',
    transparent: 'bg-transparent text-text-primary',
  }[variant];

  const paddingClasses = {
    none: 'py-0',
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32 lg:py-36',
  }[padding];

  const borderClasses = {
    top: 'border-t border-border-subtle',
    bottom: 'border-b border-border-subtle',
    both: 'border-y border-border-subtle',
    none: '',
  }[border];

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        variantClasses,
        paddingClasses,
        borderClasses,
        className
      )}
      {...props}
    >
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
