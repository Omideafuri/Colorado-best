import React from 'react';
import { cn } from '@/lib/utils';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Grid({
  children,
  cols = 12,
  gap = 'md',
  className,
  ...props
}: GridProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    12: 'grid-cols-1 lg:grid-cols-12',
  }[cols];

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-4 md:gap-6',
    md: 'gap-6 md:gap-8 lg:gap-10',
    lg: 'gap-8 md:gap-12 lg:gap-16',
    xl: 'gap-12 md:gap-16 lg:gap-24',
  }[gap];

  return (
    <div
      className={cn('grid w-full items-start', colClasses, gapClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface GridColProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
}

export function GridCol({
  children,
  span = 12,
  spanMd,
  className,
  ...props
}: GridColProps) {
  const spanClasses = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
    12: 'lg:col-span-12',
  }[span];

  const mdSpanClasses = spanMd
    ? {
        1: 'md:col-span-1',
        2: 'md:col-span-2',
        3: 'md:col-span-3',
        4: 'md:col-span-4',
        5: 'md:col-span-5',
        6: 'md:col-span-6',
        7: 'md:col-span-7',
        8: 'md:col-span-8',
        9: 'md:col-span-9',
        10: 'md:col-span-10',
        11: 'md:col-span-11',
        12: 'md:col-span-12',
      }[spanMd]
    : '';

  return (
    <div className={cn('col-span-1', mdSpanClasses, spanClasses, className)} {...props}>
      {children}
    </div>
  );
}
