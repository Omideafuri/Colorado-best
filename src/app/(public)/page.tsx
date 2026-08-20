import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Shield,
  TrendingUp,
  Wallet,
  ArrowLeftRight,
  Clock,
  Lock,
  Smartphone,
  BarChart3,
  ChevronDown,
  Package,
  Zap,
  BadgeCheck,
} from 'lucide-react';
import { toPersianDigits, formatNumber } from '@/lib/utils/format';

export const metadata: Metadata = {
  title: 'زروی — خرید و فروش طلای دیجیتال',
  description:
    'با زروی طلا بخرید، نگه دارید و سرمایه‌تان را رشد دهید. پلتفرم امن خرید و فروش طلای دیجیتال.',
};

// Mock price data — in production this comes from the pricing API
const mockPrice = {
  referenceToman: 3_500_000,
  buyToman: 3_552_500,
  sellToman: 3_447_500,
  changeToman: 25_000,
  changePct: 0.72,
};

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Text */}
            <div className="text-center lg:text-right">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl text-balance">
                طلا را ساده بخرید.
                <br />
                <span className="text-gold-600">امن نگه دارید.</span>
                <br />
                سرمایه‌تان را رشد دهید.
              </h1>
              <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0">
                با زروی، از هر مبلغی طلا بخرید و سرمایه‌گذاری مطمئنی داشته
                باشید. بدون نیاز به مراجعه حضوری، بدون دغدغه نگهداری.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg bg-gold-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-gold-600 transition-colors shadow-sm"
                >
                  شروع سرمایه‌گذاری
                </Link>
                <Link
                  href="/prices"
                  className="inline-flex items-center justify-center rounded-lg border border-border px-8 py-3.5 text-base font-medium text-text-primary hover:bg-surface-hover transition-colors"
                >
                  مشاهده قیمت طلا
                </Link>
              </div>
            </div>

            {/* Live Price Card */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-sm card-surface p-6 sm:p-7">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-gold-500" />
                    <span className="text-sm font-semibold">
                      قیمت لحظه‌ای طلای ۱۸ عیار
                    </span>
                  </div>
                  <span className="text-xs text-success font-medium bg-success-light px-2 py-0.5 rounded-full">
                    بازار باز
                  </span>
                </div>

                <p className="text-3xl font-bold font-num text-text-primary mb-1">
                  {formatNumber(mockPrice.referenceToman)}
                  <span className="text-sm font-normal text-text-muted mr-1">
                    تومان/گرم
                  </span>
                </p>

                <div
                  className={`flex items-center gap-1 text-sm font-medium mb-6 ${
                    mockPrice.changeToman >= 0 ? 'text-success' : 'text-danger'
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-num">
                    +{formatNumber(mockPrice.changeToman)}
                  </span>
                  <span className="font-num text-xs">
                    (+{toPersianDigits(mockPrice.changePct.toFixed(2))}٪)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="rounded-lg bg-success-light/40 p-3">
                    <p className="text-xs text-text-muted mb-1">خرید زروی</p>
                    <p className="text-sm font-bold font-num text-success">
                      {formatNumber(mockPrice.buyToman)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-danger-light/40 p-3">
                    <p className="text-xs text-text-muted mb-1">فروش زروی</p>
                    <p className="text-sm font-bold font-num text-danger">
                      {formatNumber(mockPrice.sellToman)}
                    </p>
                  </div>
                </div>

                <Link
                  href="/buy"
                  className="block w-full text-center rounded-lg bg-gold-500 px-4 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
                >
                  همین الان طلا بخرید
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-surface-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              سرمایه‌گذاری طلا در سه قدم
            </h2>
            <p className="mt-3 text-text-secondary">
              با زروی، خرید طلا ساده‌تر از همیشه است
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '۱',
                icon: Smartphone,
                title: 'ثبت‌نام و احراز هویت',
                desc: 'با شماره موبایل ثبت‌نام کنید و هویت خود را تأیید کنید.',
              },
              {
                step: '۲',
                icon: Wallet,
                title: 'شارژ کیف پول',
                desc: 'کیف پول خود را از طریق درگاه بانکی شارژ کنید.',
              },
              {
                step: '۳',
                icon: TrendingUp,
                title: 'خرید طلا',
                desc: 'با هر مبلغی طلا بخرید و به صورت لحظه‌ای مالک شوید.',
              },
            ].map((item) => (
              <div key={item.step} className="card-surface p-6 text-center relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                    <item.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              چرا زروی؟
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              زروی یک پلتفرم مالی حرفه‌ای است، نه یک فروشگاه آنلاین معمولی
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: 'امنیت سرمایه',
                desc: 'تمام تراکنش‌ها رمزنگاری شده و سیستم دفتر کل تضمین‌کننده دارایی شماست.',
              },
              {
                icon: Zap,
                title: 'معامله سریع',
                desc: 'خرید و فروش طلا در کسری از ثانیه با قیمت لحظه‌ای بازار.',
              },
              {
                icon: BarChart3,
                title: 'پس‌انداز هوشمند',
                desc: 'با خرید خودکار طلا به صورت روزانه، هفتگی یا ماهانه پس‌انداز کنید.',
              },
              {
                icon: ArrowLeftRight,
                title: 'انتقال آسان',
                desc: 'طلای خود را به دوستان و آشنایان با شماره موبایل منتقل کنید.',
              },
              {
                icon: Package,
                title: 'تحویل فیزیکی',
                desc: 'هر زمان خواستید طلای خود را به صورت فیزیکی تحویل بگیرید.',
              },
              {
                icon: BadgeCheck,
                title: 'قیمت‌گذاری شفاف',
                desc: 'اسپرد و کارمزد مشخص. بدون هزینه پنهان.',
              },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-4 p-5 rounded-xl hover:bg-surface-secondary transition-colors">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gold-100 text-gold-700">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST / SECURITY ===== */}
      <section className="bg-surface-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-bold text-text-primary sm:text-3xl mb-6">
                سرمایه شما در امان است
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: Lock,
                    title: 'پشتوانه طلا',
                    desc: 'تمام طلای دیجیتال شما دارای پشتوانه فیزیکی واقعی است.',
                    
                  },
                  {
                    icon: Shield,
                    title: 'رمزنگاری پیشرفته',
                    desc: 'ارتباطات و داده‌های شما با استانداردهای امنیتی سطح بالا محافظت می‌شوند.',
                  },
                  {
                    icon: BarChart3,
                    title: 'دفتر کل تغییرناپذیر',
                    desc: 'هر تراکنش در دفتر کل مالی ثبت شده و قابل ردیابی است.',
                  },
                  {
                    icon: Clock,
                    title: 'دسترسی همیشگی',
                    desc: 'به موجودی طلای خود در هر لحظه از شبانه‌روز دسترسی دارید.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface text-gold-600 border border-border-light">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary mb-0.5">
                        {item.title}
                        
                      </h3>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'کاربران فعال', value: '—', note: 'به‌زودی' },
                { label: 'طلای نگهداری شده', value: '—', note: 'به‌زودی' },
                { label: 'تراکنش موفق', value: '—', note: 'به‌زودی' },
                { label: 'رضایت کاربران', value: '—', note: 'به‌زودی' },
              ].map((stat) => (
                <div key={stat.label} className="card-surface p-5 text-center">
                  <p className="text-2xl font-bold font-num text-gold-600 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-text-secondary">{stat.label}</p>
                  <p className="text-[10px] text-text-muted mt-1">{stat.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SAVINGS CTA ===== */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-surface p-8 sm:p-12 border-gold-200">
            <BarChart3 className="h-10 w-10 text-gold-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl mb-3">
              پس‌انداز هوشمند زروی
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto mb-6">
              با تعیین مبلغ و بازه زمانی دلخواه، به صورت خودکار طلا بخرید و
              بدون فکر کردن به نوسانات بازار، سرمایه‌تان را رشد دهید.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-gold-500 px-8 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
            >
              شروع پس‌انداز طلا
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-surface-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-10 sm:text-3xl">
            سوالات متداول
          </h2>

          <div className="space-y-3">
            {[
              {
                q: 'حداقل مبلغ خرید طلا چقدر است؟',
                a: 'شما می‌توانید از ۱۰۰,۰۰۰ تومان به بالا طلا خریداری کنید.',
              },
              {
                q: 'آیا امکان تحویل فیزیکی طلا وجود دارد؟',
                a: 'بله، شما می‌توانید طلای دیجیتال خود را به صورت شمش، سکه یا پلاک طلا تحویل بگیرید. هزینه ساخت و ارسال جداگانه محاسبه می‌شود.',
              },
              {
                q: 'کارمزد معاملات چقدر است؟',
                a: 'کارمزد هر معامله به صورت شفاف قبل از تأیید نمایش داده می‌شود. جزئیات در صفحه قوانین و مقررات موجود است.',
              },
              {
                q: 'آیا طلای من پشتوانه فیزیکی دارد؟',
                a: 'جزئیات پشتوانه و نگهداری طلا پس از تکمیل زیرساخت اعلام خواهد شد.',
              },
              {
                q: 'انتقال طلا به دیگران چگونه انجام می‌شود؟',
                a: 'با وارد کردن شماره موبایل یا شناسه کاربری گیرنده، می‌توانید طلای خود را منتقل کنید.',
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group card-surface overflow-hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors [&::-webkit-details-marker]:hidden list-none">
                  {faq.q}
                  <ChevronDown className="h-4 w-4 text-text-muted transition-transform group-open:rotate-180 flex-shrink-0 mr-2" />
                </summary>
                <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl mb-4">
            همین حالا سرمایه‌گذاری در طلا را شروع کنید
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            ثبت‌نام رایگان. بدون نیاز به حداقل موجودی. خرید طلا از ۱۰۰ هزار
            تومان.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-gold-500 px-10 py-4 text-base font-semibold text-white hover:bg-gold-600 transition-colors shadow-sm"
          >
            ساخت حساب رایگان
          </Link>
        </div>
      </section>
    </>
  );
}
