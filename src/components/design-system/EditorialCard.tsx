import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectImage } from './AspectImage';

export interface EditorialCardProps {
  title: string;
  category?: string;
  excerpt: string;
  imageSrc: string;
  href?: string;
  ratio?: 'square' | '4/3' | '16/9' | '3/4';
  className?: string;
}

export function EditorialCard({
  title,
  category,
  excerpt,
  imageSrc,
  href = '#',
  ratio = '4/3',
  className,
}: EditorialCardProps) {
  return (
    <div
      className={cn(
        'group bg-surface rounded-3xl p-6 sm:p-8 border border-border flex flex-col justify-between hover:shadow-lg transition-all duration-500',
        className
      )}
    >
      <div>
        <AspectImage
          src={imageSrc}
          alt={title}
          ratio={ratio}
          rounded="sm"
          className="mb-6"
        />

        {category && (
          <span className="text-[10px] tracking-brand font-bold text-gold-600 block mb-1 uppercase">
            {category}
          </span>
        )}

        <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2 group-hover:text-gold-600 transition-colors">
          {title}
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed font-light mb-6">
          {excerpt}
        </p>
      </div>

      <Link
        href={href}
        className="inline-flex items-center gap-1 text-xs font-bold text-text-primary hover:text-gold-600 transition-colors pt-4 border-t border-border"
      >
        <span>ادامه مطلب</span>
        <ArrowLeft className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
