import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { toPersianDigits, formatNumber } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { ArrowLeft, RefreshCw, Sparkles, Lock, Layers, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'زروی — خانه طلای دیجیتال و مسکوکات فاخر',
  description: 'پلتفرم مدرن خرید، فروش، پس‌انداز و تحویل فیزیکی طلای ۱۸ و ۲۴ عیار با اصالت تضمین‌شده.',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const snapshot = await getLatestPriceSnapshot('18K');
  const buyToman = Number(snapshot.buyPriceRial / BigInt(10));
  const sellToman = Number(snapshot.sellPriceRial / BigInt(10));
  const refToman = Number(snapshot.referencePriceRial / BigInt(10));
  const spreadToman = buyToman - sellToman;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#E3CCAE] selection:text-[#000000] overflow-x-hidden">

      {/* ━━━ STAGE 1: HERO MASTHEAD (Champagne Canvas & Navy Brand Anchor) ━━━ */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-36 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] overflow-hidden border-b border-[#E8E1D5]">
        
        {/* Monumental Typographic Backdrop */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.035]">
          <span className="text-[clamp(6rem,24vw,28rem)] font-extrabold tracking-[0.18em] text-[#262A56] leading-none">
            ZARAVI
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Main Column: Editorial Headline & Action Triggers */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-[11px] sm:text-xs text-[#4A463F] mb-6 shadow-xs">
                <span className="diamond-motif !w-1.5 !h-1.5" />
                <span className="font-medium tracking-wide">آتلیه و پلتفرم رسمی طلای ایران</span>
              </div>

              {/* Responsive Monumental Title */}
              <h1 className="text-[clamp(2.1rem,7vw,5.5rem)] font-bold text-[#141210] leading-[1.12] sm:leading-[1.08] tracking-tight mb-6 sm:mb-8">
                طلا؛ تجلی ارزش پایدار<br className="hidden xs:inline" />
                و <span className="text-[#B8621B] font-semibold italic">معماری ثروت.</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-[#4A463F] font-light max-w-xl mb-8 sm:mb-10 leading-relaxed">
                خرید برخط طلای ۱۸ و ۲۴ عیار با نرخ لحظه‌ای بازار، نگهداری امن در خزانه بیمه‌شده و قابلیت تحویل فیزیکی شمش‌های استاندارد در سراسر کشور.
              </p>

              {/* Responsive Touch Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10 sm:mb-12">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 py-3.5 rounded-full flex items-center justify-center gap-3 text-sm">
                    <span>افتتاح حساب و خرید طلا</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/prices" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-7 py-3.5 text-sm justify-center">
                    تابلوی لحظه‌ای نرخ‌ها
                  </Button>
                </Link>
              </div>

              {/* Real-time Gold Indicator Pill */}
              <div className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E8E1D5] shadow-xs">
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold text-[#262A56]">طلای ۱۸ عیار:</span>
                  <span className="font-num font-bold text-sm text-[#B8621B]">
                    {toPersianDigits(formatNumber(refToman))} تومان
                  </span>
                </div>
                <span className="text-[#E8E1D5] hidden sm:inline">|</span>
                <span className="text-[10px] sm:text-xs text-[#7D776C]">منبع: AlanChand API</span>
              </div>

            </div>

            {/* Feature Studio Photo Card */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8E1D5] bg-white shadow-xl sm:shadow-2xl">
                <Image
                  src="/images/hero_gold.jpg"
                  alt="Zaravi 24K Pure Gold Bullion Ingot"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#262A56]/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-end">
                  <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-[#E8E1D5] text-[11px] sm:text-xs">
                    <span className="text-[#7D776C] block text-[9px] sm:text-[10px]">خلوص استاندارد</span>
                    <span className="font-num font-bold text-[#141210]">۹۹۹.۹ Fine Gold</span>
                  </div>
                  <div className="bg-[#B8621B] text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold shadow-xs">
                    شناسه ملی اتحادیه
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Responsive Horizontal Ticker Bar */}
        <div className="mt-14 sm:mt-20 border-t border-b border-[#E8E1D5] bg-white/60 backdrop-blur-xs py-3.5 sm:py-4">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-[11px] sm:text-xs text-[#4A463F]">
            <span className="flex items-center gap-1.5">
              <span className="diamond-motif !w-1.5 !h-1.5 flex-shrink-0" />
              <span className="truncate">شمش‌های دارای کد شناسه استاندارد</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="diamond-motif !w-1.5 !h-1.5 flex-shrink-0" />
              <span className="truncate">تسویه آنی ریالی شبکه شتاب</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="diamond-motif !w-1.5 !h-1.5 flex-shrink-0" />
              <span className="truncate">پشتوانه ۱۰۰٪ فیزیکی در خزانه</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="diamond-motif !w-1.5 !h-1.5 flex-shrink-0" />
              <span className="truncate">پست بیمه‌شده محرمانه سراسری</span>
            </span>
          </div>
        </div>
      </section>

      {/* ━━━ STAGE 2: ATELIER NARRATIVE & PROOF ━━━ */}
      <section className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 bg-[#FAF8F5]">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex items-center gap-2.5 mb-8 sm:mb-12">
            <span className="diamond-motif" />
            <span className="text-[11px] sm:text-xs tracking-brand font-semibold text-[#7D776C]">فلسفه و منشور زروی</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Staggered Micro-Gallery */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E1D5] shadow-xs sm:shadow-md">
                <Image
                  src="/images/craftsmanship.jpg"
                  alt="Zaravi Craftsman Goldsmith"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E1D5] shadow-xs sm:shadow-md mt-4 sm:mt-8">
                <Image
                  src="/images/brand_story.jpg"
                  alt="Zaravi Gold Still Life"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text Narrative & Metrics */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <h2 className="text-[clamp(1.75rem,3.2vw,3.5rem)] font-bold text-[#141210] leading-[1.25] tracking-tight mb-6 sm:mb-8">
                ترکیب اصالت ماده<br />
                با شفافیت مدرن دیجیتال.
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-[#4A463F] leading-relaxed font-light mb-8 sm:mb-10">
                در زروی، هر سهم از طلای خریده‌شده متعلق به شمش‌های فیزیکی نگهداری‌شده در خزانه امن بانک است. ما اصطکاک‌های خرید سنتی مانند حباب غیرواقعی، کارمزدهای مبهم و ریسک جابه‌جایی را حذف کرده‌ایم.
              </p>

              {/* Responsive Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full pt-6 sm:pt-8 border-t border-[#E8E1D5]">
                <div>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-num text-[#B8621B] block mb-1">۹۹۹.۹</span>
                  <span className="text-[10px] sm:text-xs text-[#7D776C]">خلوص شمش ۲۴ عیار</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-num text-[#262A56] block mb-1">۱۰۰٪</span>
                  <span className="text-[10px] sm:text-xs text-[#7D776C]">پشتوانه فیزیکی خزانه</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-num text-[#262A56] block mb-1">۲۴/۷</span>
                  <span className="text-[10px] sm:text-xs text-[#7D776C]">معاملات برخط آنی</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ STAGE 3: FINE CRAFTSMANSHIP & SPEC BREAKDOWN ━━━ */}
      <section className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 bg-white border-t border-b border-[#E8E1D5]">
        <div className="max-w-[1400px] mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] text-[11px] sm:text-xs text-[#7D776C] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#B8621B]" />
            <span>استانداردهای ریخته‌گری و امنیتی</span>
          </div>

          <h2 className="text-[clamp(1.75rem,3.8vw,3.5rem)] font-bold text-[#141210] tracking-tight mb-4 sm:mb-6">
            اجزای یک شمش سرمایه‌گذاری استاندارد
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#4A463F] max-w-2xl mx-auto font-light mb-12 sm:mb-16">
            تمامی شمش‌های زروی دارای گواهی عیارسنجی اتحادیه طلا و جواهر و پلمپ امنیتی غیرقابل جعل هستند.
          </p>

          {/* 3-Column Grid Annotations */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-center">
            
            {/* Right Annotations */}
            <div className="space-y-4 sm:space-y-6 text-right">
              <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E8E1D5]">
                <span className="text-[10px] sm:text-xs font-bold text-[#B8621B] tracking-wider block mb-1">۰۱ / شناسه استاندارد</span>
                <h4 className="text-sm sm:text-base font-semibold text-[#141210] mb-1">کد حک‌شده لیزری</h4>
                <p className="text-xs text-[#4A463F] leading-relaxed">
                  هر شمش دارای یک شماره سریال اختصاصی ثبت‌شده در سامانه اتحادیه است.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E8E1D5]">
                <span className="text-[10px] sm:text-xs font-bold text-[#B8621B] tracking-wider block mb-1">۰۲ / خلوص عیار</span>
                <h4 className="text-sm sm:text-base font-semibold text-[#141210] mb-1">طلای خالص ۲۴ عیار (۷۵۰/۹۹۹)</h4>
                <p className="text-xs text-[#4A463F] leading-relaxed">
                  تضمین عیارسنجی در آزمایشگاه‌های معتبر ری‌گیری کشور.
                </p>
              </div>
            </div>

            {/* Center Render */}
            <div className="relative aspect-square max-w-xs sm:max-w-md mx-auto w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8E1D5] shadow-lg my-4 lg:my-0">
              <Image
                src="/images/hero_gold.jpg"
                alt="Zaravi Ingot Anatomy"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover p-3 sm:p-4 bg-[#FAF8F5]"
              />
            </div>

            {/* Left Annotations */}
            <div className="space-y-4 sm:space-y-6 text-right">
              <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E8E1D5]">
                <span className="text-[10px] sm:text-xs font-bold text-[#B8621B] tracking-wider block mb-1">۰۳ / بسته پلمپ امنیتی</span>
                <h4 className="text-sm sm:text-base font-semibold text-[#141210] mb-1">هولوگرام ضدجعل</h4>
                <p className="text-xs text-[#4A463F] leading-relaxed">
                  بسته‌بندی امنیتی وکیوم شده با قابلیت استعلام آنلاین اصالت.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E8E1D5]">
                <span className="text-[10px] sm:text-xs font-bold text-[#B8621B] tracking-wider block mb-1">۰۴ / نقدشوندگی</span>
                <h4 className="text-sm sm:text-base font-semibold text-[#141210] mb-1">بازخرید آنی با بالاترین نرخ</h4>
                <p className="text-xs text-[#4A463F] leading-relaxed">
                  قابلیت فروش لحظه‌ای در پلتفرم زروی بدون کسر کارمزد اضافی.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ STAGE 4: THE MIDNIGHT TRADING TERMINAL CAPSULE (Midnight Lapis #262A56) ━━━ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 bg-[#FAF8F5]">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="bg-[#262A56] text-[#FAF8F5] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 border border-white/15 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#B8621B]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              
              {/* Terminal Details */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] sm:text-xs text-[#E3CCAE] mb-4 sm:mb-6">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>تابلوی معاملات برخط زروی</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-6">
                  قیمت‌گذاری شفاف و بی‌واسطه
                </h2>

                <p className="text-[#C5BFB4] font-light leading-relaxed text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
                  قیمت‌ها بر اساس تابلوی رسمی اتحادیه و سرورهای مرجع AlanChand محاسبه می‌شوند. اسپرد پلتفرم کاملاً شفاف و ثابت است.
                </p>

                <div className="space-y-3 sm:space-y-4 border-t border-white/10 pt-5">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-[#C5BFB4]">قیمت مرجع بازار (گرم ۱۸ عیار):</span>
                    <span className="font-num font-bold text-white text-sm sm:text-base">{toPersianDigits(formatNumber(refToman))} تومان</span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-[#C5BFB4]">اسپرد شفاف خرید/فروش:</span>
                    <span className="font-num font-semibold text-[#E3CCAE]">{toPersianDigits(formatNumber(spreadToman))} تومان</span>
                  </div>
                </div>
              </div>

              {/* Trading Card Module */}
              <div className="lg:col-span-7 bg-[#1A1D3D] p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-white/10">
                <div className="flex justify-between items-center border-b border-white/10 pb-4 sm:pb-6 mb-6">
                  <div>
                    <span className="text-[10px] sm:text-xs text-[#C5BFB4] block mb-1">شاخص اصلی معاملات</span>
                    <h3 className="text-base sm:text-lg font-bold text-white">طلای ۱۸ عیار (۷۵۰)</h3>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] sm:text-xs text-emerald-400 font-semibold block">بازار زنده</span>
                    <span className="text-[10px] sm:text-xs text-[#C5BFB4] font-num">۲۰ ثانیه‌ای</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-[#262A56] p-4 sm:p-5 rounded-xl border border-white/10">
                    <span className="text-[10px] sm:text-xs text-[#C5BFB4] block mb-1">نرخ خرید زروی از شما (فروش)</span>
                    <p className="text-xl sm:text-2xl font-bold font-num text-white">{toPersianDigits(formatNumber(sellToman))} <span className="text-xs font-normal text-[#C5BFB4]">تومان</span></p>
                    <span className="text-[10px] text-[#C5BFB4] mt-1 block">تسویه آنی شتاب</span>
                  </div>

                  <div className="bg-[#262A56] p-4 sm:p-5 rounded-xl border border-white/10">
                    <span className="text-[10px] sm:text-xs text-[#C5BFB4] block mb-1">نرخ فروش زروی به شما (خرید)</span>
                    <p className="text-xl sm:text-2xl font-bold font-num text-white">{toPersianDigits(formatNumber(buyToman))} <span className="text-xs font-normal text-[#C5BFB4]">تومان</span></p>
                    <span className="text-[10px] text-[#C5BFB4] mt-1 block">ثبت آنی در کیف طلا</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/buy" className="w-full sm:flex-1">
                    <Button variant="primary" className="w-full py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm">
                      خرید آنلاین طلا
                    </Button>
                  </Link>
                  <Link href="/sell" className="w-full sm:flex-1">
                    <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm">
                      فروش موجودی
                    </Button>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ━━━ STAGE 5: CURATED COLLECTIONS MATRIX ━━━ */}
      <section className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex justify-between items-end mb-10 sm:mb-16">
            <div>
              <span className="text-[10px] sm:text-xs tracking-brand font-semibold text-[#7D776C] block mb-1.5">مجموعه‌های فاخر</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#141210] tracking-tight">محصولات فیزیکی طلا و مسکوکات</h2>
            </div>
            <Link href="/store" className="text-xs font-bold text-[#B8621B] hover:text-[#9E5214] flex items-center gap-1">
              <span className="hidden sm:inline">مشاهده تمام محصولات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: Bars */}
            <div className="group bg-[#FAF8F5] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] flex flex-col justify-between hover:border-[#B8621B]/40 hover:shadow-xl transition-all duration-500">
              <div>
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-6 bg-white p-4 border border-[#E8E1D5]/60">
                  <Image
                    src="/images/hero_gold.jpg"
                    alt="شمش طلای ۲۴ عیار"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="text-[10px] tracking-brand font-bold text-[#B8621B] block mb-1">COLLECTION ۰۱</span>
                <h3 className="text-lg sm:text-xl font-bold text-[#141210] mb-2">شمش‌های سرمایه‌گذاری ۲۴ عیار</h3>
                <p className="text-xs text-[#4A463F] leading-relaxed mb-6 font-light">
                  از ۱ گرم تا ۱۰۰ گرم با خلوص ۹۹۹.۹ و هولوگرام امنیتی بانکی.
                </p>
              </div>
              <Link href="/store" className="inline-flex items-center justify-between text-xs font-bold text-[#262A56] pt-4 border-t border-[#E8E1D5] group-hover:text-[#B8621B]">
                <span>سفارش و تحویل فیزیکی</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Coins */}
            <div className="group bg-[#FAF8F5] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] flex flex-col justify-between hover:border-[#B8621B]/40 hover:shadow-xl transition-all duration-500">
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-white p-4 border border-[#E8E1D5]/60">
                  <Image
                    src="/images/craftsmanship.jpg"
                    alt="مسکوکات بهار آزادی"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="text-[10px] tracking-brand font-bold text-[#B8621B] block mb-1">COLLECTION ۰۲</span>
                <h3 className="text-lg sm:text-xl font-bold text-[#141210] mb-2">مسکوکات بانکی و بهار آزادی</h3>
                <p className="text-xs text-[#4A463F] leading-relaxed mb-6 font-light">
                  انواع سکه‌های امامی، طرح قدیم، نیم و ربع سکه ضرب بانک مرکزی.
                </p>
              </div>
              <Link href="/store" className="inline-flex items-center justify-between text-xs font-bold text-[#262A56] pt-4 border-t border-[#E8E1D5] group-hover:text-[#B8621B]">
                <span>سفارش و تحویل فیزیکی</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: Plaques */}
            <div className="group bg-[#FAF8F5] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] flex flex-col justify-between hover:border-[#B8621B]/40 hover:shadow-xl transition-all duration-500">
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-white p-4 border border-[#E8E1D5]/60">
                  <Image
                    src="/images/brand_story.jpg"
                    alt="پلاک‌های پارسیان"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="text-[10px] tracking-brand font-bold text-[#B8621B] block mb-1">COLLECTION ۰۳</span>
                <h3 className="text-lg sm:text-xl font-bold text-[#141210] mb-2">پلاک و آویزهای زرین</h3>
                <p className="text-xs text-[#4A463F] leading-relaxed mb-6 font-light">
                  پلاک‌های پارسیان با وزن‌های خرد کادویی و طراحی اختصاصی.
                </p>
              </div>
              <Link href="/store" className="inline-flex items-center justify-between text-xs font-bold text-[#262A56] pt-4 border-t border-[#E8E1D5] group-hover:text-[#B8621B]">
                <span>سفارش و تحویل فیزیکی</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ STAGE 6: ECOSYSTEM BENTO GRID ━━━ */}
      <section className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 bg-[#FAF8F5] border-t border-[#E8E1D5]">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="text-[10px] sm:text-xs tracking-brand font-semibold text-[#7D776C] block mb-2">مزایای رقابتی</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#141210] tracking-tight">ستون‌های پلتفرم زروی</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8E1D5] shadow-xs">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F4EFE6] flex items-center justify-center text-[#262A56] mb-5 border border-[#E8E1D5]">
                <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#141210] mb-2">تسویه آنی ریالی</h3>
              <p className="text-xs text-[#4A463F] leading-relaxed font-light">
                فروش طلای دیجیتال و واریز آنی وجه به کارت‌های بانکی عضو شتاب در هر ساعت از شبانه‌روز.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8E1D5] shadow-xs">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F4EFE6] flex items-center justify-center text-[#262A56] mb-5 border border-[#E8E1D5]">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#141210] mb-2">خزانه امن بیمه‌شده</h3>
              <p className="text-xs text-[#4A463F] leading-relaxed font-light">
                نگهداری فیزیکی طلا در گاوصندوق‌های اختصاصی بانکی با پوشش ۱۰۰٪ بیمه حوادث.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8E1D5] shadow-xs">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F4EFE6] flex items-center justify-center text-[#262A56] mb-5 border border-[#E8E1D5]">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#141210] mb-2">پس‌انداز خودکار</h3>
              <p className="text-xs text-[#4A463F] leading-relaxed font-light">
                برنامه‌ریزی خرید منظم و دوره‌ای طلا برای حفظ ارزش سرمایه در برابر تورم.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8E1D5] shadow-xs">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F4EFE6] flex items-center justify-center text-[#262A56] mb-5 border border-[#E8E1D5]">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#141210] mb-2">ارسال محرمانه پستی</h3>
              <p className="text-xs text-[#4A463F] leading-relaxed font-light">
                تحویل فیزیکی طلا در بسته‌بندی امن و محرمانه با پست بیمه‌شده به تمام نقاط کشور.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ STAGE 7: PRE-FOOTER INVITATION ━━━ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1000px] mx-auto text-center bg-[#FAF8F5] p-8 sm:p-12 md:p-20 rounded-2xl sm:rounded-3xl border border-[#E8E1D5] shadow-xs">
          <span className="diamond-motif !w-2.5 !h-2.5 mx-auto block mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#141210] tracking-tight mb-4 sm:mb-6">
            سفر سرمایه‌گذاری خود را آغاز کنید
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#4A463F] font-light max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed">
            در کمتر از ۲ دقیقه حساب کاربری خود را فعال کنید و با هر مبلغی طلای استاندارد خریداری کنید.
          </p>
          <Link href="/register">
            <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 py-3.5 rounded-full font-medium text-xs sm:text-sm">
              افتتاح حساب رایگان در زروی
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
