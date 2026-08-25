import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

export function Container({
  children,
  size = 'lg',
  className,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-4xl',
    md: 'max-w-6xl',
    lg: 'max-w-[1400px]',
    full: 'max-w-full',
  }[size];

  return (
    <div
      className={cn(
        'mx-auto w-full px-6 sm:px-8 md:px-10 lg:px-12',
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
