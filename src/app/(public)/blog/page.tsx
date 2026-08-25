import { BookOpen, Sparkles } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#B8621B] selection:text-white pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-xs text-[#262A56] mb-4 shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-[#B8621B]" />
          <span>مجلّه و تحلیل‌های آتلیه</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#141210] tracking-tight mb-3">گاهنامه زرین زروی</h1>
        <p className="text-xs sm:text-sm text-[#4A463F] mb-12 font-light max-w-lg mx-auto">
          تحلیل‌های فاندامنتال بازار طلا، راهنمای نگهداری فلزات گرانبها و مقالات تخصصی معماری ثروت
        </p>

        <div className="bg-white rounded-3xl p-12 sm:p-20 border border-[#E8E1D5] shadow-xs space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D5] mx-auto flex items-center justify-center text-[#B8621B]">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-[#262A56]">در حال نگارش مقالات تخصصی</h2>
          <p className="text-xs sm:text-sm text-[#4A463F] max-w-md mx-auto leading-relaxed font-light">
            به‌زودی اولین سری از تحلیل‌های اختصاصی کارشناسان زروی در خصوص چشم‌انداز طلای جهانی و بازار داخلی منتشر خواهد شد.
          </p>
        </div>
      </div>
    </div>
  );
}