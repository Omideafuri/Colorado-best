import React from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export interface AspectImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  ratio?: 'square' | '4/3' | '16/9' | '3/4' | 'auto';
  zoomOnHover?: boolean;
  overlay?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  imageClassName?: string;
}

export function AspectImage({
  src,
  alt,
  ratio = '4/3',
  zoomOnHover = true,
  overlay = false,
  rounded = 'md',
  className,
  imageClassName,
  ...props
}: AspectImageProps) {
  const ratioClasses = {
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    '3/4': 'aspect-[3/4]',
    auto: '',
  }[ratio];

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-lg',
    md: 'rounded-2xl',
    lg: 'rounded-3xl',
    full: 'rounded-full',
  }[rounded];

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-surface-secondary border border-border/80',
        ratioClasses,
        roundedClasses,
        zoomOnHover && 'group',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          'object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          zoomOnHover && 'group-hover:scale-105',
          imageClassName
        )}
        {...props}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/50 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
}
