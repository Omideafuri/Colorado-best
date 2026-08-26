import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectImage } from './AspectImage';
import { PriceDisplay } from './Typography';

export interface ProductCardProps {
  id?: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  priceToman: number;
  href?: string;
  className?: string;
}

export function ProductCard({
  title,
  category,
  description,
  imageSrc,
  priceToman,
  href = '/store',
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        'group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#E8E2D7] flex flex-col justify-between hover:border-[#B35817]/60 hover:shadow-card transition-all duration-500',
        className
      )}
    >
      <div>
        <AspectImage
          src={imageSrc}
          alt={title}
          ratio="square"
          rounded="sm"
          className="mb-5 bg-[#FAF8F4] p-3 sm:p-4 border border-[#E8E2D7]/80"
        />

        <span className="text-[10px] tracking-brand font-bold text-[#B35817] block mb-1 uppercase">
          {category}
        </span>

        <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#161412] mb-2 group-hover:text-[#14182E] transition-colors">
          {title}
        </h3>

        <p className="text-xs text-[#4A453E] leading-relaxed mb-6 font-light">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-[#E8E2D7] flex items-end justify-between">
        <PriceDisplay toman={priceToman} size="sm" />

        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14182E] hover:text-[#B35817] transition-colors"
        >
          <span>سفارش و تحویل</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
