import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { toPersianDigits, formatNumber } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { ArrowLeft, RefreshCw, Sparkles, Lock, Layers, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'زروی — خانه طلای دیجیتال و مسکوکات فاخر',
  description: 'پلتفرم پیشرو خرید، فروش، پس‌انداز و تحویل فیزیکی طلای ۱۸ و ۲۴ عیار با پشتوانه ۱۰۰٪ شمش در خزانه بانکی.',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const snapshot = await getLatestPriceSnapshot('18K');
  const buyToman = Number(snapshot.buyPriceRial / BigInt(10));
  const sellToman = Number(snapshot.sellPriceRial / BigInt(10));
  const refToman = Number(snapshot.referencePriceRial / BigInt(10));
  const spreadToman = buyToman - sellToman;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F4] text-[#161412] selection:bg-[#B35817] selection:text-white overflow-x-hidden">

      {/* ━━━ ACT I: MONOLITHIC SOVEREIGN MASTHEAD ━━━ */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-32 bg-v2-lapis overflow-hidden border-b border-white/10 text-white">
        
        {/* Typographic Architectural Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.035]">
          <span className="text-[clamp(6rem,24vw,28rem)] font-extrabold tracking-[0.2em] text-[#EBD8C1] leading-none">
            ZARAVI
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Editorial Left Hero Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs text-[#EBD8C1] mb-6 shadow-xs">
                <span className="diamond-motif !w-1.5 !h-1.5" />
                <span className="font-medium tracking-wide">پلتفرم و آتلیه رسمی طلای دیجیتال ایران</span>
              </div>

              {/* Responsive Hero Heading */}
              <h1 className="text-[clamp(2.1rem,6.5vw,5.25rem)] font-bold text-white leading-[1.12] sm:leading-[1.08] tracking-tight mb-6 sm:mb-8">
                طلا؛ تجلی ارزش ماندگار<br className="hidden xs:inline" />
                و <span className="text-[#B35817] font-semibold">معماری ثروت پایدار.</span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-[#C7C0B3] font-light max-w-xl mb-8 sm:mb-10 leading-relaxed">
                خرید آنلاین طلای ۱۸ و ۲۴ عیار با تابلوی رسمی نرخ لحظه‌ای، نگهداری امن در خزانه بیمه‌شده بانکی و امکان سفارش تحویل فیزیکی شمش‌های دارای هولوگرام در سراسر کشور.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10 sm:mb-12">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold shadow-copper-glow">
                    <span>افتتاح حساب و خرید طلا</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/prices" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-7 py-3.5 text-xs sm:text-sm justify-center border-white/25 text-white hover:bg-white hover:text-[#14182E]">
                    تابلوی زنده نرخ‌ها
                  </Button>
                </Link>
              </div>

              {/* Real-time Indicator Capsule */}
              <div className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 bg-[#0C0E1A]/80 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/10 shadow-lapis-glow">
                <div className="flex items-center gap-2.5 text-xs">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold text-[#EBD8C1]">طلای ۱۸ عیار:</span>
                  <span className="font-num font-bold text-sm text-[#B35817]">
                    {toPersianDigits(formatNumber(refToman))} تومان
                  </span>
                </div>
                <span className="text-white/20 hidden sm:inline">|</span>
                <span className="text-[10px] sm:text-xs text-[#C7C0B3] font-light">منبع: تابلوی رسمی AlanChand</span>
              </div>

            </div>

            {/* Studio Photography Visual Card */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#0C0E1A] shadow-2xl">
                <Image
                  src="/images/hero_gold.jpg"
                  alt="Zaravi 24K Pure Gold Bullion Ingot"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E1A]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-end">
                  <div className="bg-[#14182E]/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-[11px] sm:text-xs">
                    <span className="text-[#C7C0B3] block text-[9px] sm:text-[10px]">خلوص رسمی استاندارد</span>
                    <span className="font-num font-bold text-[#EBD8C1]">۹۹۹.۹ Fine Gold</span>
                  </div>
                  <div className="bg-[#B35817] text-white px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold shadow-copper-glow">
                    شناسه ثبت اتحادیه
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Live Ticker Bar */}
        <div className="mt-12 sm:mt-16 border-t border-b border-white/10 bg-[#0C0E1A]/80 backdrop-blur-sm py-3.5">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-[11px] sm:text-xs text-[#EBD8C1]">
            <span className="flex items-center gap-2 truncate">
              <span className="diamond-motif !w-1.5 !h-1.5 flex-shrink-0" />
              <span>شمش‌های دارای کد سریال لیزری</span>
            </span>
            <span className="flex items-center gap-2 truncate">
              <span className="diamond-motif !w-1.5 !h-1.5 flex-shrink-0" />
              <span>تسویه آنی ریالی شبکه شتاب</span>
            </span>
            <span className="flex items-center gap-2 truncate">
              <span className="diamond-motif !w-1.5 !h-1.5 flex-shrink-0" />
              <span>پشتوانه ۱۰۰٪ فیزیکی در خزانه</span>
            </span>
            <span className="flex items-center gap-2 truncate">
              <span className="diamond-motif !w-1.5 !h-1.5 flex-shrink-0" />
              <span>پست بیمه‌شده سراسری</span>
            </span>
          </div>
        </div>
      </section>

      {/* ━━━ ACT II: ATELIER NARRATIVE & PHYSICAL PROOF ━━━ */}
      <section className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 bg-[#FAF8F4]">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex items-center gap-2.5 mb-8 sm:mb-12">
            <span className="diamond-motif" />
            <span className="text-[11px] sm:text-xs tracking-brand font-semibold text-[#7E776C]">فلسفه و منشور زروی</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Dual Studio Visuals */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-3.5 sm:gap-5">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#E8E2D7] shadow-subtle bg-white p-2.5">
                <Image
                  src="/images/craftsmanship.jpg"
                  alt="Zaravi Craftsman Goldsmith"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#E8E2D7] shadow-subtle mt-6 sm:mt-10 bg-white p-2.5">
                <Image
                  src="/images/brand_story.jpg"
                  alt="Zaravi Gold Still Life"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Text Narrative */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <h2 className="text-[clamp(1.75rem,3.2vw,3.25rem)] font-bold text-[#14182E] leading-[1.22] tracking-tight mb-6 sm:mb-8">
                ترکیب اصالت فلز زرین<br />
                با شفافیت مدرن دیجیتال.
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-[#4A453E] leading-relaxed font-light mb-8 sm:mb-10">
                در زروی، هر واحد از طلای خریداری‌شده متعلق به شمش‌های فیزیکی نگهداری‌شده در خزانه‌های امن بانکی است. ما حباب‌های غیرواقعی، کارمزدهای پنهان و ریسک نگهداری سنتی را با دفتر کل شفاف جایگزین کرده‌ایم.
              </p>

              {/* 3-Pillar Metrics */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full pt-6 sm:pt-8 border-t border-[#E8E2D7]">
                <div>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-num text-[#B35817] block mb-1">۹۹۹.۹</span>
                  <span className="text-[10px] sm:text-xs text-[#7E776C] font-light">خلوص شمش ۲۴ عیار</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-num text-[#14182E] block mb-1">۱۰۰٪</span>
                  <span className="text-[10px] sm:text-xs text-[#7E776C] font-light">پشتوانه فیزیکی در خزانه</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-num text-[#161412] block mb-1">۲۴/۷</span>
                  <span className="text-[10px] sm:text-xs text-[#7E776C] font-light">معاملات برخط آنی</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ ACT III: CRAFTSMANSHIP & INGOT ANATOMY ━━━ */}
      <section className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 bg-[#0C0E1A] text-white border-t border-b border-white/10">
        <div className="max-w-[1400px] mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14182E] border border-white/15 text-[11px] sm:text-xs text-[#EBD8C1] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#B35817]" />
            <span>استانداردهای ریخته‌گری و عیارسنجی</span>
          </div>

          <h2 className="text-[clamp(1.75rem,3.8vw,3.25rem)] font-bold text-white tracking-tight mb-4 sm:mb-6">
            شناسنامه شمش استاندارد زروی
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#C7C0B3] max-w-2xl mx-auto font-light mb-12 sm:mb-16">
            تمامی شمش‌های ارائه‌شده در زروی دارای گواهی عیارسنجی اتحادیه طلا و جواهر و پلمپ ضدجعل امنیتی هستند.
          </p>

          {/* 3-Column Grid */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-center text-right">
            
            {/* Right Side Specs */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-[#14182E] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lapis-glow">
                <span className="text-[10px] sm:text-xs font-bold text-[#B35817] tracking-wider block mb-1">۰۱ / شناسه اختصاصی</span>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1">کد سریال حک‌شده لیزری</h4>
                <p className="text-xs text-[#C7C0B3] leading-relaxed font-light">
                  هر قطعه دارای یک شماره سریال اختصاصی ثبت‌شده در سامانه رهگیری اتحادیه است.
                </p>
              </div>

              <div className="bg-[#14182E] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lapis-glow">
                <span className="text-[10px] sm:text-xs font-bold text-[#B35817] tracking-wider block mb-1">۰۲ / خلوص عیار</span>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1">طلای خالص ۲۴ عیار (۷۵۰/۹۹۹)</h4>
                <p className="text-xs text-[#C7C0B3] leading-relaxed font-light">
                  تضمین عیارسنجی در آزمایشگاه‌های معتبر ری‌گیری مورد تأیید استاندارد کشور.
                </p>
              </div>
            </div>

            {/* Center Product Macro View */}
            <div className="relative aspect-square max-w-xs sm:max-w-md mx-auto w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl my-4 lg:my-0 bg-[#14182E]">
              <Image
                src="/images/hero_gold.jpg"
                alt="Zaravi Ingot Anatomy"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover p-3 sm:p-4"
              />
            </div>

            {/* Left Side Specs */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-[#14182E] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lapis-glow">
                <span className="text-[10px] sm:text-xs font-bold text-[#B35817] tracking-wider block mb-1">۰۳ / پلمپ ضدجعل</span>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1">وکیوم امنیتی با هولوگرام</h4>
                <p className="text-xs text-[#C7C0B3] leading-relaxed font-light">
                  بسته‌بندی وکیوم بدون آسیب به شمش با قابلیت اعتبارسنجی کیوآرکد آنلاین.
                </p>
              </div>

              <div className="bg-[#14182E] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-lapis-glow">
                <span className="text-[10px] sm:text-xs font-bold text-[#B35817] tracking-wider block mb-1">۰۴ / نقدشوندگی کامل</span>
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1">بازخرید آنی بدون کارمزد مخفی</h4>
                <p className="text-xs text-[#C7C0B3] leading-relaxed font-light">
                  قابلیت فروش لحظه‌ای در پلتفرم با تسویه آنی به شماره شبای ثبت‌شده.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ ACT IV: LIVE ATELIER TRADING TERMINAL CAPSULE ━━━ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 bg-[#FAF8F4]">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="bg-[#14182E] text-[#FAF8F4] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 border border-white/15 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#B35817]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              
              {/* Terminal Info */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] sm:text-xs text-[#EBD8C1] mb-4 sm:mb-6">
                  <RefreshCw className="w-3.5 h-3.5 text-[#B35817]" />
                  <span>تابلوی معاملات برخط زروی</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-6">
                  قیمت‌گذاری شفاف و بی‌واسطه
                </h2>

                <p className="text-[#C7C0B3] font-light leading-relaxed text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
                  قیمت‌ها به صورت مستقیم از سرورهای مرجع AlanChand دریافت می‌شوند و اسپرد خرید و فروش پلتفرم کاملاً شفاف است.
                </p>

                <div className="space-y-3 sm:space-y-4 border-t border-white/10 pt-5">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-[#C7C0B3]">قیمت مرجع بازار (گرم ۱۸ عیار):</span>
                    <span className="font-num font-bold text-white text-sm sm:text-base">{toPersianDigits(formatNumber(refToman))} تومان</span>
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-[#C7C0B3]">اسپرد شفاف خرید/فروش:</span>
                    <span className="font-num font-semibold text-[#EBD8C1]">{toPersianDigits(formatNumber(spreadToman))} تومان</span>
                  </div>
                </div>
              </div>

              {/* Trading Card Module */}
              <div className="lg:col-span-7 bg-[#0C0E1A] p-5 sm:p-8 rounded-2xl border border-white/15 shadow-2xl">
                <div className="flex justify-between items-center border-b border-white/10 pb-4 sm:pb-6 mb-6">
                  <div>
                    <span className="text-[10px] sm:text-xs text-[#C7C0B3] block mb-1">شاخص اصلی مبادلات</span>
                    <h3 className="text-base sm:text-lg font-bold text-white">طلای ۱۸ عیار (۷۵۰)</h3>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] sm:text-xs text-emerald-400 font-semibold block">نرخ لحظه‌ای بازار</span>
                    <span className="text-[10px] sm:text-xs text-[#C7C0B3] font-num">به‌روزرسانی خودکار</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-[#14182E] p-4 sm:p-5 rounded-xl border border-white/10">
                    <span className="text-[10px] sm:text-xs text-[#C7C0B3] block mb-1 font-light">نرخ خرید زروی از شما (فروش)</span>
                    <p className="text-xl sm:text-2xl font-bold font-num text-white">{toPersianDigits(formatNumber(sellToman))} <span className="text-xs font-normal text-[#C7C0B3]">تومان</span></p>
                    <span className="text-[10px] text-[#C7C0B3] mt-1 block">تسویه آنی شتاب</span>
                  </div>

                  <div className="bg-[#14182E] p-4 sm:p-5 rounded-xl border border-white/10">
                    <span className="text-[10px] sm:text-xs text-[#C7C0B3] block mb-1 font-light">نرخ فروش زروی به شما (خرید)</span>
                    <p className="text-xl sm:text-2xl font-bold font-num text-white">{toPersianDigits(formatNumber(buyToman))} <span className="text-xs font-normal text-[#C7C0B3]">تومان</span></p>
                    <span className="text-[10px] text-[#C7C0B3] mt-1 block">ثبت آنی در کیف طلا</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/buy" className="w-full sm:flex-1">
                    <Button variant="primary" className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-semibold shadow-copper-glow">
                      خرید آنلاین طلا
                    </Button>
                  </Link>
                  <Link href="/sell" className="w-full sm:flex-1">
                    <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white py-3.5 rounded-xl text-xs sm:text-sm">
                      فروش موجودی
                    </Button>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ━━━ ACT V: CURATED PHYSICAL COLLECTIONS MATRIX ━━━ */}
      <section className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex justify-between items-end mb-10 sm:mb-16">
            <div>
              <span className="text-[10px] sm:text-xs tracking-brand font-semibold text-[#B35817] block mb-1.5 uppercase">مجموعه‌های فاخر</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#161412] tracking-tight">محصولات فیزیکی طلا و مسکوکات</h2>
            </div>
            <Link href="/store" className="text-xs font-bold text-[#B35817] hover:text-[#94460E] flex items-center gap-1">
              <span className="hidden sm:inline">مشاهده گالری کامل</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: Gold Bars */}
            <div className="group bg-[#FAF8F4] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E8E2D7] flex flex-col justify-between hover:border-[#B35817] hover:shadow-card transition-all duration-500">
              <div>
                <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-6 bg-white p-4 border border-[#E8E2D7]/80">
                  <Image
                    src="/images/hero_gold.jpg"
                    alt="شمش طلای ۲۴ عیار"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="text-[10px] tracking-brand font-bold text-[#B35817] block mb-1 uppercase">COLLECTION ۰۱</span>
                <h3 className="text-lg sm:text-xl font-bold text-[#14182E] mb-2">شمش‌های سرمایه‌گذاری ۲۴ عیار</h3>
                <p className="text-xs text-[#4A453E] leading-relaxed mb-6 font-light">
                  از ۱ گرم تا ۱۰۰ گرم با خلوص ۹۹۹.۹ و هولوگرام امنیتی بانکی.
                </p>
              </div>
              <Link href="/store" className="inline-flex items-center justify-between text-xs font-bold text-[#14182E] pt-4 border-t border-[#E8E2D7] group-hover:text-[#B35817]">
                <span>مشاهده و سفارش</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Coins */}
            <div className="group bg-[#14182E] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/15 flex flex-col justify-between hover:border-[#B35817] hover:shadow-lapis-glow transition-all duration-500">
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-[#0C0E1A] p-4 border border-white/10">
                  <Image
                    src="/images/craftsmanship.jpg"
                    alt="مسکوکات بهار آزادی"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="text-[10px] tracking-brand font-bold text-[#EBD8C1] block mb-1 uppercase">COLLECTION ۰۲</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">مسکوکات بانکی بهار آزادی</h3>
                <p className="text-xs text-[#C7C0B3] leading-relaxed mb-6 font-light">
                  انواع سکه‌های امامی، طرح قدیم، نیم و ربع سکه ضرب رسمی بانک مرکزی.
                </p>
              </div>
              <Link href="/store" className="inline-flex items-center justify-between text-xs font-bold text-[#EBD8C1] pt-4 border-t border-white/10 group-hover:text-white">
                <span>مشاهده و سفارش</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: Plaques */}
            <div className="group bg-[#0C0E1A] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/15 flex flex-col justify-between hover:border-[#B35817] hover:shadow-2xl transition-all duration-500">
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-[#14182E] p-4 border border-white/10">
                  <Image
                    src="/images/brand_story.jpg"
                    alt="پلاک‌های پارسیان"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <span className="text-[10px] tracking-brand font-bold text-[#B35817] block mb-1 uppercase">COLLECTION ۰۳</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">پلاک و آویزهای زرین</h3>
                <p className="text-xs text-[#C7C0B3] leading-relaxed mb-6 font-light">
                  پلاک‌های پارسیان با وزن‌های خرد کادویی و وکیوم رسمی استاندارد.
                </p>
              </div>
              <Link href="/store" className="inline-flex items-center justify-between text-xs font-bold text-[#B35817] pt-4 border-t border-white/10 group-hover:text-white">
                <span>مشاهده و سفارش</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ ACT VI: PLATFORM PILLARS BENTO GRID ━━━ */}
      <section className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 bg-[#FAF8F4] border-t border-[#E8E2D7]">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="text-[10px] sm:text-xs tracking-brand font-semibold text-[#B35817] block mb-2 uppercase">مزایای انحصاری</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#14182E] tracking-tight">ستون‌های پلتفرم زروی</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-[#14182E] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 shadow-lapis-glow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0C0E1A] flex items-center justify-center text-[#EBD8C1] mb-5 border border-white/10">
                <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">تسویه آنی ریالی</h3>
              <p className="text-xs text-[#C7C0B3] leading-relaxed font-light">
                فروش طلای دیجیتال و واریز آنی وجه به کارت‌های بانکی عضو شتاب در هر ساعت از شبانه‌روز.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#EBD8C1] text-[#161412] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#DFD8CB] shadow-subtle">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center text-[#14182E] mb-5 border border-[#DFD8CB]">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#161412] mb-2">خزانه امن بیمه‌شده</h3>
              <p className="text-xs text-[#4A453E] leading-relaxed font-light">
                نگهداری فیزیکی طلا در گاوصندوق‌های اختصاصی بانکی با پوشش ۱۰۰٪ بیمه حوادث.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#0C0E1A] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#14182E] flex items-center justify-center text-[#B35817] mb-5 border border-white/10">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">پس‌انداز خودکار</h3>
              <p className="text-xs text-[#C7C0B3] leading-relaxed font-light">
                برنامه‌ریزی خرید منظم و دوره‌ای طلا برای حفظ ارزش سرمایه در برابر تورم.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white text-[#161412] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8E2D7] hover:border-[#B35817] shadow-subtle transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F3EFE6] flex items-center justify-center text-[#B35817] mb-5 border border-[#E8E2D7]">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#14182E] mb-2">ارسال محرمانه پستی</h3>
              <p className="text-xs text-[#4A453E] leading-relaxed font-light">
                تحویل فیزیکی طلا در بسته‌بندی امن و محرمانه با پست ویژه بیمه‌شده به تمام نقاط کشور.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ━━━ ACT VII: PRE-FOOTER INVITATION ━━━ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1000px] mx-auto text-center bg-gradient-to-br from-[#14182E] via-[#0C0E1A] to-[#06070D] text-white p-8 sm:p-12 md:p-20 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#B35817]/15 rounded-full blur-3xl pointer-events-none" />
          <span className="diamond-motif !w-2.5 !h-2.5 mx-auto block mb-4 sm:mb-6 shadow-copper-glow" />
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 sm:mb-6">
            سفر سرمایه‌گذاری خود را آغاز کنید
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#EBD8C1] font-light max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed">
            در کمتر از ۲ دقیقه حساب کاربری خود را فعال کنید و با هر مبلغی طلای استاندارد خریداری کنید.
          </p>
          <Link href="/register">
            <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 py-3.5 rounded-full font-semibold text-xs sm:text-sm shadow-copper-glow">
              افتتاح حساب آنلاین در زروی
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
