import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { toPersianDigits, formatNumber } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'زروی — خانه طلای دیجیتال و جواهرات فاخر',
  description: 'پلتفرم مدرن خرید، فروش، پس‌انداز و تحویل فیزیکی طلای ۱۸ و ۲۴ عیار.',
};

const mockPrice = {
  referenceToman: 3500000,
  buyToman: 3552500,
  sellToman: 3447500,
  changePercent: 0.72,
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-gold-200">

      {/* ━━━ 01. CINEMATIC HERO ━━━ */}
      <section className="relative min-h-screen flex flex-col justify-end bg-surface-dark text-white overflow-hidden">
        {/* Background Editorial Image with Chiaroscuro Overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_gold.jpg"
            alt="Zaravi Sculptural Gold"
            fill
            priority
            className="object-cover object-right md:object-center opacity-65 scale-[1.02] transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/60 to-[#141210]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#141210]/40 to-[#141210]/80" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] w-full px-6 md:px-10 pb-16 md:pb-24 pt-32">
          {/* Top Brand Mark */}
          <div className="flex items-center gap-3 mb-8">
            <span className="diamond-motif !w-2.5 !h-2.5 !bg-gold-400" />
            <span className="text-xs tracking-brand text-gold-300/80 font-medium">جواهر · طلا · اشیاء ماندگار</span>
          </div>

          {/* Headline */}
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,7.5vw,6.5rem)] font-bold text-white leading-[1.02] tracking-tight mb-8">
              طلا فقط<br />
              پوشیده نمی‌شود.<br />
              <span className="text-gold-400 font-normal">به یاد سپرده</span><br />
              می‌شود.
            </h1>

            <p className="text-lg md:text-xl text-neutral-300 font-light max-w-lg mb-12 leading-relaxed">
              پلتفرم شفاف خرید، نگهداری امن و تحویل فیزیکی طلای شمش و مسکوکات با اصالت تضمین‌شده.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto bg-gold-500 hover:bg-gold-600 text-surface-dark font-semibold border-transparent">
                  شروع سرمایه‌گذاری
                </Button>
              </Link>
              <Link href="/store">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white hover:text-surface-dark hover:border-white">
                  گالری محصولات
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Line Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold-400/50">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold-400/60" />
        </div>
      </section>

      {/* ━━━ 02. BRAND STATEMENT & PHILOSOPHY ━━━ */}
      <section className="section-editorial px-6 md:px-10 bg-atmospheric-ivory">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="diamond-motif" />
            <span className="text-xs tracking-brand text-text-muted">فلسفه زروی</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-[clamp(1.8rem,3.8vw,3.2rem)] font-semibold text-text-primary leading-[1.35] tracking-tight">
                زروی بر پایه اصالت ماده، دقت مهندسی مالی و زیبایی‌شناسی معاصر بنا شده است. 
                ما دسترسی به طلای واقعی را بدون اصطکاک‌های سنتی و با شفافیت مطلق فراهم کرده‌ایم.
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="text-text-secondary leading-relaxed mb-6">
                تمام موجودی دیجیتال شما دارای پشتوانه شمش‌های دارای شناسه و مهر استاندارد بوده و در هر لحظه به صورت فیزیکی یا معادل ریالی قابل برداشت است.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-gold-600 transition-colors">
                <span>داستان خانه زروی</span>
                <span className="text-xs">←</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 03. FEATURED SERVICES — Asymmetric Editorial Grid ━━━ */}
      <section className="section-editorial px-6 md:px-10 bg-surface">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="diamond-motif" />
            <span className="text-xs tracking-brand text-text-muted">ستون‌های پلتفرم</span>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            {/* Buy Gold */}
            <Link href="/buy" className="group bg-surface-secondary p-10 md:p-14 flex flex-col justify-between min-h-[420px] hover:bg-surface transition-all duration-700">
              <div>
                <span className="text-xs tracking-brand text-text-muted block mb-4">۰۱ / خـریـد</span>
                <h3 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight group-hover:text-gold-600 transition-colors">
                  خرید آنی طلا
                </h3>
              </div>
              <div>
                <p className="text-text-secondary max-w-sm leading-relaxed mb-6">
                  خرید طلای ۱۸ عیار از مبالغ خرد تا سفارش‌های کلان با قیمت زنده اتحادیه و کمترین شکاف قیمت در کشور.
                </p>
                <span className="text-xs font-semibold text-text-primary group-hover:translate-x-[-4px] inline-block transition-transform">
                  ورود به بخش خرید ←
                </span>
              </div>
            </Link>

            {/* Sell Gold */}
            <Link href="/sell" className="group bg-surface-secondary p-10 md:p-14 flex flex-col justify-between min-h-[420px] hover:bg-surface transition-all duration-700">
              <div>
                <span className="text-xs tracking-brand text-text-muted block mb-4">۰۲ / فـروش</span>
                <h3 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight group-hover:text-gold-600 transition-colors">
                  فروش و تسویه فوری
                </h3>
              </div>
              <div>
                <p className="text-text-secondary max-w-sm leading-relaxed mb-6">
                  تبدیل موجودی طلا به ریال در کسری از ثانیه و انتقال مستقیم وجه به حساب‌های بانکی شتاب.
                </p>
                <span className="text-xs font-semibold text-text-primary group-hover:translate-x-[-4px] inline-block transition-transform">
                  ورود به بخش فروش ←
                </span>
              </div>
            </Link>

            {/* Save */}
            <Link href="/savings" className="group bg-surface-secondary p-10 md:p-14 flex flex-col justify-between min-h-[420px] hover:bg-surface transition-all duration-700">
              <div>
                <span className="text-xs tracking-brand text-text-muted block mb-4">۰۳ / پـس‌انـداز</span>
                <h3 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight group-hover:text-gold-600 transition-colors">
                  طرح‌های پس‌انداز خودکار
                </h3>
              </div>
              <div>
                <p className="text-text-secondary max-w-sm leading-relaxed mb-6">
                  برنامه‌ریزی خرید هوشمند و دوره‌ای طلا برای حفظ ارزش سرمایه در برابر تورم بدون دغدغه نوسانات روزمره.
                </p>
                <span className="text-xs font-semibold text-text-primary group-hover:translate-x-[-4px] inline-block transition-transform">
                  تنظیم طرح پس‌انداز ←
                </span>
              </div>
            </Link>

            {/* Deliver */}
            <Link href="/delivery" className="group bg-surface-secondary p-10 md:p-14 flex flex-col justify-between min-h-[420px] hover:bg-surface transition-all duration-700">
              <div>
                <span className="text-xs tracking-brand text-text-muted block mb-4">۰۴ / تـحـویـل</span>
                <h3 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight group-hover:text-gold-600 transition-colors">
                  تحویل فیزیکی بیمه‌شده
                </h3>
              </div>
              <div>
                <p className="text-text-secondary max-w-sm leading-relaxed mb-6">
                  دریافت فیزیکی طلا در قالب شمش‌های ۱ تا ۱۰ گرمی یا سکه‌های بانکی در بسته‌بندی امن و محرمانه در سراسر کشور.
                </p>
                <span className="text-xs font-semibold text-text-primary group-hover:translate-x-[-4px] inline-block transition-transform">
                  ثبت درخواست تحویل ←
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ 04. CRAFTSMANSHIP & ART DOCUMENTARY ━━━ */}
      <section className="section-editorial px-6 md:px-10 bg-surface-dark text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-4 mb-8">
                <span className="diamond-motif !bg-gold-400" />
                <span className="text-xs tracking-brand text-gold-300/80">هنر ساخت و اصالت</span>
              </div>

              <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.2] tracking-tight mb-8">
                هر قطعه طلا،<br />
                حاصل دست‌های استادکار<br />
                و <span className="text-gold-400">عیارسنجی دقیق</span> است.
              </h2>

              <p className="text-neutral-300 leading-relaxed max-w-lg mb-8 font-light text-base md:text-lg">
                تمامی محصولات زروی در کارگاه‌های اختصاصی و زیر نظر بازرسان رسمی اتحادیه طلا و جواهر ریخته‌گری، تراش و نشان‌گذاری می‌شوند. ما اطمینان می‌دهیم که هر میلی‌گرم طلا با بالاترین استاندارد خلوص به دست شما برسد.
              </p>

              <div className="border-t border-neutral-800 pt-8 mt-8 grid grid-cols-2 gap-8">
                <div>
                  <span className="text-2xl font-bold font-num text-gold-400">۹۹۹.۹</span>
                  <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">خلوص شمش ۲۴ عیار</p>
                </div>
                <div>
                  <span className="text-2xl font-bold font-num text-gold-400">۱۰۰٪</span>
                  <p className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">پوشش بیمه ارسال</p>
                </div>
              </div>
            </div>

            {/* Editorial Craftsmanship Photography */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] image-hover-zoom border border-neutral-800 bg-[#1A1816]">
                <Image
                  src="/images/craftsmanship.jpg"
                  alt="Zaravi Master Goldsmith Craftsmanship"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 right-6">
                  <span className="text-xs font-mono tracking-brand text-white/80 uppercase bg-black/60 px-3 py-1.5 backdrop-blur-md">
                    ATELIER ZARAVI — EST. 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 05. EDITORIAL BRAND STORY / STILL LIFE ━━━ */}
      <section className="section-editorial px-6 md:px-10 bg-atmospheric-ivory">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="diamond-motif" />
                <span className="text-xs tracking-brand text-text-muted">جاودانگی دارایی</span>
              </div>
              <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-semibold text-text-primary leading-[1.3] tracking-tight mb-6">
                طلا، پیوند دیروز و فردا.
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                در عصری که پول کاغذی ارزش خود را از دست می‌دهد، طلا نماد پایدار ثروت و آرامش خاطر است. زروی تجربه لمس این ارزش را با زیرساخت‌های مدرن دیجیتال ترکیب کرده است.
              </p>
              <Link href="/about">
                <Button variant="secondary">مطالعه منشور شفافیت</Button>
              </Link>
            </div>
            <div className="lg:col-span-6 lg:order-1">
              <div className="relative aspect-[16/10] image-hover-zoom border border-border bg-surface">
                <Image
                  src="/images/brand_story.jpg"
                  alt="Zaravi Luxury Gold Architecture"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 06. COLLECTIONS SHOWCASE ━━━ */}
      <section className="section-editorial px-6 md:px-10 bg-surface">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-4">
              <span className="diamond-motif" />
              <span className="text-xs tracking-brand text-text-muted">گالری و مجموعه‌ها</span>
            </div>
            <Link href="/store" className="text-xs font-semibold text-text-primary hover:text-gold-600 transition-colors">
              مشاهده تمام محصولات ←
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {/* Bar */}
            <Link href="/store" className="group bg-surface-secondary flex flex-col justify-between hover:bg-surface transition-colors duration-700">
              <div className="relative aspect-square image-hover-zoom bg-surface-hover/50 p-8 border-b border-border">
                <Image
                  src="/images/product_bar.jpg"
                  alt="شمش طلای زروی"
                  fill
                  className="object-cover p-6"
                />
              </div>
              <div className="p-8">
                <span className="text-xs tracking-brand text-text-muted block mb-2">COLLECTION ۰۱</span>
                <h3 className="text-xl font-semibold text-text-primary mb-1">شمش ۵ گرمی سرمایه‌گذاری</h3>
                <p className="text-sm text-text-secondary">طلای خالص ۲۴ عیار با نشان و شناسنامه اختصاصی</p>
              </div>
            </Link>

            {/* Coin */}
            <Link href="/store" className="group bg-surface-secondary flex flex-col justify-between hover:bg-surface transition-colors duration-700">
              <div className="relative aspect-square image-hover-zoom bg-surface-hover/50 p-8 border-b border-border">
                <Image
                  src="/images/product_coin.jpg"
                  alt="سکه بهار آزادی"
                  fill
                  className="object-cover p-6"
                />
              </div>
              <div className="p-8">
                <span className="text-xs tracking-brand text-text-muted block mb-2">COLLECTION ۰۲</span>
                <h3 className="text-xl font-semibold text-text-primary mb-1">مسکوکات بانکی و یادبود</h3>
                <p className="text-sm text-text-secondary">انواع سکه‌های ضرب بانک مرکزی با هولوگرام امنیتی</p>
              </div>
            </Link>

            {/* Plaque */}
            <Link href="/store" className="group bg-surface-secondary flex flex-col justify-between hover:bg-surface transition-colors duration-700">
              <div className="relative aspect-square image-hover-zoom bg-surface-hover/50 p-8 border-b border-border">
                <Image
                  src="/images/product_plaque.jpg"
                  alt="پلاک پارسیان زروی"
                  fill
                  className="object-cover p-6"
                />
              </div>
              <div className="p-8">
                <span className="text-xs tracking-brand text-text-muted block mb-2">COLLECTION ۰۳</span>
                <h3 className="text-xl font-semibold text-text-primary mb-1">پلاک و آویز معماری</h3>
                <p className="text-sm text-text-secondary">طراحی شده با الهام از خطوط معماری ایرانی معاصر</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ 07. LIVE PRICE TERMINAL ━━━ */}
      <section className="section-editorial px-6 md:px-10 bg-atmospheric-ivory border-t border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-8">
                <span className="diamond-motif" />
                <span className="text-xs tracking-brand text-text-muted">تابلوی معاملاتی</span>
              </div>

              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-semibold text-text-primary leading-[1.25] tracking-tight mb-6">
                قیمت‌گذاری لحظه‌ای و شفاف
              </h2>

              <p className="text-text-secondary leading-relaxed mb-8">
                نرخ‌های اعلامی زروی برگرفته از تابلوی رسمی بازار طلا و جواهر تهران است. بدون دریافت کارمزدهای پنهان و با تضمین بهترین نرخ نقدشوندگی در بازار.
              </p>

              <Link href="/prices">
                <Button variant="secondary">مشاهده تابلوی کامل نرخ‌ها</Button>
              </Link>
            </div>

            {/* Price Terminal Card */}
            <div className="lg:col-span-7 border border-border bg-surface p-8 md:p-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-border pb-8 mb-8 gap-4">
                <div>
                  <span className="text-xs tracking-brand text-text-muted block mb-2">ZARAVI INDEX — 18K / IRR</span>
                  <p className="text-xs text-text-muted">هر گرم طلای ۱۸ عیار (۷۵۰)</p>
                </div>
                <div className="text-left">
                  <p className="text-3xl md:text-4xl font-semibold font-num text-text-primary tracking-tight">
                    {toPersianDigits(formatNumber(mockPrice.referenceToman))} <span className="text-sm font-normal text-text-muted">تومان</span>
                  </p>
                  <p className="text-success text-xs font-semibold font-num mt-1">
                    +{toPersianDigits(mockPrice.changePercent.toString())}% (۲۴ ساعت گذشته)
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-text-secondary">نرخ خرید زروی از شما</span>
                  <span className="text-lg font-num font-semibold text-text-primary">{toPersianDigits(formatNumber(mockPrice.buyToman))} تومان</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-text-secondary">نرخ فروش زروی به شما</span>
                  <span className="text-lg font-num font-semibold text-text-primary">{toPersianDigits(formatNumber(mockPrice.sellToman))} تومان</span>
                </div>
                <div className="flex justify-between items-center pt-5 border-t border-border">
                  <span className="text-sm text-text-secondary">اسپرد معاملاتی</span>
                  <span className="text-sm font-num font-semibold text-gold-600">{toPersianDigits(formatNumber(mockPrice.buyToman - mockPrice.sellToman))} تومان</span>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <Link href="/buy">
                  <Button className="w-full">خرید طلا</Button>
                </Link>
                <Link href="/sell">
                  <Button variant="outline" className="w-full">فروش طلا</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 08. FINAL CTA ━━━ */}
      <section className="section-editorial px-6 md:px-10 bg-surface-dark text-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="diamond-motif !bg-gold-400 !w-3 !h-3 mx-auto mb-10 block" />

          <h2 className="text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.2] tracking-tight mb-8">
            ثروت شما<br />
            شایسته ماندگاری است.
          </h2>

          <p className="text-neutral-400 mb-10 leading-relaxed font-light text-base md:text-lg">
            به جامعه سرمایه‌گذاران زروی بپیوندید و دارایی‌های طلای خود را در یک بستر امن و مدرن مدیریت کنید.
          </p>

          <Link href="/register">
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-surface-dark font-semibold px-10">
              افتتاح حساب در زروی
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
