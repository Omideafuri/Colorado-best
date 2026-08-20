import Link from 'next/link';
import type { Metadata } from 'next';
import { toPersianDigits, formatNumber } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'زروی — طلا، جواهر، اشیاء',
  description: 'پلتفرم مدرن خرید، فروش و مدیریت طلای فیزیکی.',
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
        {/* Abstract gold visual composition */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-surface-dark via-surface-dark/95 to-surface-dark" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold-700/6 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] w-full px-6 md:px-10 pb-16 md:pb-24">
          {/* Top — Brand Mark */}
          <div className="absolute top-32 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="diamond-motif !w-3 !h-3 !bg-gold-500 mb-6" />
            <span className="text-xs tracking-brand text-text-muted">جواهر · طلا · اشیاء</span>
          </div>

          {/* Headline */}
          <div className="pt-[50vh] md:pt-[45vh]">
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold text-white leading-[0.95] tracking-tight mb-8">
              طلا فقط<br />
              پوشیده نمی‌شود.<br />
              <span className="text-gold-400">به یاد سپرده</span><br />
              می‌شود.
            </h1>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-12">
              <Link href="/register">
                <Button variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white hover:text-surface-dark hover:border-white">
                  شروع سرمایه‌گذاری
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg" className="text-text-muted hover:text-white hover:bg-transparent">
                  کاوش در زروی
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted animate-reveal-fade" style={{ animationDelay: '1.5s' }}>
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold-500/40" />
        </div>
      </section>

      {/* ━━━ 02. BRAND STATEMENT ━━━ */}
      <section className="section-editorial px-6 md:px-10 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="diamond-motif" />
            <span className="text-xs tracking-brand text-text-muted">درباره زروی</span>
          </div>

          <div className="max-w-4xl">
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-semibold text-text-primary leading-[1.3] tracking-tight">
              زروی یک پلتفرم مدیریت ثروت مبتنی بر طلای فیزیکی است.
              ما به شما اجازه می‌دهیم طلا را به شکل دیجیتال بخرید،
              نگهداری کنید و هر زمان اراده کردید به صورت فیزیکی تحویل بگیرید.
            </h2>
          </div>

          <div className="mt-16">
            <Link href="/about">
              <Button variant="outline">بیشتر بدانید</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ 03. FEATURED PIECES — Editorial Layout ━━━ */}
      <section className="section-editorial px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="diamond-motif" />
            <span className="text-xs tracking-brand text-text-muted">خدمات اصلی</span>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            {/* Buy Gold */}
            <Link href="/buy" className="group bg-surface-secondary p-10 md:p-16 flex flex-col justify-between min-h-[500px] hover:bg-surface transition-colors duration-700">
              <div>
                <span className="text-xs tracking-brand text-text-muted block mb-4">۰۱</span>
                <h3 className="text-3xl md:text-4xl font-semibold text-text-primary tracking-tight">خرید طلا</h3>
              </div>
              <p className="text-text-secondary max-w-sm leading-relaxed mt-auto">
                خرید آنی طلای ۱۸ عیار با پشتوانه فیزیکی. با کمترین اسپرد در بازار ایران و قیمت‌گذاری شفاف و لحظه‌ای.
              </p>
            </Link>

            {/* Sell Gold */}
            <Link href="/sell" className="group bg-surface-secondary p-10 md:p-16 flex flex-col justify-between min-h-[500px] hover:bg-surface transition-colors duration-700">
              <div>
                <span className="text-xs tracking-brand text-text-muted block mb-4">۰۲</span>
                <h3 className="text-3xl md:text-4xl font-semibold text-text-primary tracking-tight">فروش طلا</h3>
              </div>
              <p className="text-text-secondary max-w-sm leading-relaxed mt-auto">
                فروش فوری موجودی طلای دیجیتال و واریز وجه به حساب بانکی شما. بدون تأخیر و بدون کارمزد مخفی.
              </p>
            </Link>

            {/* Save */}
            <Link href="/savings" className="group bg-surface-secondary p-10 md:p-16 flex flex-col justify-between min-h-[500px] hover:bg-surface transition-colors duration-700">
              <div>
                <span className="text-xs tracking-brand text-text-muted block mb-4">۰۳</span>
                <h3 className="text-3xl md:text-4xl font-semibold text-text-primary tracking-tight">پس‌انداز خودکار</h3>
              </div>
              <p className="text-text-secondary max-w-sm leading-relaxed mt-auto">
                برنامه خرید خودکار طلا. روزانه، هفتگی یا ماهانه مقدار دلخواه طلا بخرید و ثروت خود را تدریجی بسازید.
              </p>
            </Link>

            {/* Deliver */}
            <Link href="/delivery" className="group bg-surface-secondary p-10 md:p-16 flex flex-col justify-between min-h-[500px] hover:bg-surface transition-colors duration-700">
              <div>
                <span className="text-xs tracking-brand text-text-muted block mb-4">۰۴</span>
                <h3 className="text-3xl md:text-4xl font-semibold text-text-primary tracking-tight">تحویل فیزیکی</h3>
              </div>
              <p className="text-text-secondary max-w-sm leading-relaxed mt-auto">
                معادل موجودی دیجیتال خود را به صورت شمش، سکه یا جواهرات استاندارد در آدرس خود دریافت کنید.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ 04. CRAFTSMANSHIP ━━━ */}
      <section className="section-editorial px-6 md:px-10 bg-surface-dark text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-12">
                <span className="diamond-motif" />
                <span className="text-xs tracking-brand text-text-muted">هنر ساخت</span>
              </div>

              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.2] tracking-tight mb-8">
                هر گرم طلا<br />
                داستانی از صبر<br />
                و <span className="text-gold-400">دقت</span> دارد.
              </h2>

              <p className="text-lg text-text-muted leading-relaxed max-w-lg mb-10">
                از استخراج تا ذوب، از عیارسنجی تا شمش‌ریزی — هر مرحله با استانداردهای بین‌المللی و زیر نظر کارشناسان مجرب انجام می‌شود. سیستم دفتر کل دوگانه ما تمام تراکنش‌ها را شفاف ثبت می‌کند.
              </p>

              <Link href="/about">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-surface-dark hover:border-white">
                  مشاهده فرآیند
                </Button>
              </Link>
            </div>

            {/* Abstract visual — macro gold texture simulation */}
            <div className="relative aspect-[4/5] lg:aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-800/30 via-gold-600/20 to-transparent" />
              <div className="absolute top-1/4 right-1/4 w-3/4 h-3/4 bg-gold-500/10 blur-[80px] rounded-full" />
              <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/2 border border-gold-500/20 transform rotate-45" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-gold-400/30 transform rotate-45" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gold-500/20 transform rotate-45" />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 05. COLLECTIONS ━━━ */}
      <section className="section-editorial px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="diamond-motif" />
            <span className="text-xs tracking-brand text-text-muted">مجموعه‌ها</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              { name: 'شمش', en: 'BARS', desc: 'شمش‌های ۱ تا ۱۰ گرمی' },
              { name: 'سکه', en: 'COINS', desc: 'سکه‌های بانکی و یادبود' },
              { name: 'پلاک', en: 'PLAQUES', desc: 'پلاک‌های پارسیان' },
              { name: 'هدیه', en: 'GIFTS', desc: 'بسته‌های هدیه طلا' },
            ].map((collection) => (
              <Link
                key={collection.en}
                href="/store"
                className="group bg-surface-secondary p-8 md:p-10 flex flex-col justify-between min-h-[350px] hover:bg-surface transition-colors duration-700"
              >
                <span className="text-xs tracking-brand text-text-muted">{collection.en}</span>
                <div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-2 group-hover:text-gold-600 transition-colors duration-500">{collection.name}</h3>
                  <p className="text-sm text-text-secondary">{collection.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 06. LIVE GOLD PRICE ━━━ */}
      <section className="section-editorial px-6 md:px-10 bg-surface">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-4 mb-12">
                <span className="diamond-motif" />
                <span className="text-xs tracking-brand text-text-muted">قیمت لحظه‌ای</span>
              </div>

              <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold text-text-primary leading-[1.2] tracking-tight mb-6">
                قیمت‌گذاری شفاف
              </h2>

              <p className="text-lg text-text-secondary leading-relaxed max-w-lg mb-10">
                متصل به بازار جهانی و اتحادیه طلای تهران. قیمت‌ها لحظه‌ای و بدون تأخیر. اسپرد و کارمزد ما همیشه قابل مشاهده است.
              </p>

              <Link href="/prices">
                <Button>مشاهده تابلوی قیمت</Button>
              </Link>
            </div>

            {/* Price Terminal — Clean & Editorial */}
            <div className="border border-border p-8 md:p-12">
              <div className="flex justify-between items-start border-b border-border pb-8 mb-8">
                <div>
                  <span className="text-xs tracking-brand text-text-muted block mb-2">ZARAVI INDEX</span>
                  <span className="text-sm text-text-muted">Gold 18K / IRR</span>
                </div>
                <div className="text-left">
                  <p className="text-3xl md:text-4xl font-semibold font-num text-text-primary tracking-tight">
                    {toPersianDigits(formatNumber(mockPrice.referenceToman))}
                  </p>
                  <p className="text-success text-sm font-medium font-num mt-1">
                    +{toPersianDigits(mockPrice.changePercent.toString())}%
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">قیمت خرید</span>
                  <span className="text-lg font-num font-medium text-text-primary">{toPersianDigits(formatNumber(mockPrice.buyToman))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">قیمت فروش</span>
                  <span className="text-lg font-num font-medium text-text-primary">{toPersianDigits(formatNumber(mockPrice.sellToman))}</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-border">
                  <span className="text-sm text-text-secondary">اسپرد</span>
                  <span className="text-lg font-num font-medium text-gold-600">{toPersianDigits(formatNumber(mockPrice.buyToman - mockPrice.sellToman))}</span>
                </div>
              </div>

              <div className="mt-10 flex gap-3">
                <Link href="/buy" className="flex-1">
                  <Button className="w-full">خرید</Button>
                </Link>
                <Link href="/sell" className="flex-1">
                  <Button variant="outline" className="w-full">فروش</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 07. FINAL CTA ━━━ */}
      <section className="section-editorial px-6 md:px-10 bg-surface-dark text-white text-center">
        <div className="max-w-3xl mx-auto">
          <span className="diamond-motif !bg-gold-500 !w-4 !h-4 mx-auto mb-12 block" />

          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.2] tracking-tight mb-8">
            ثروت شما<br />
            شایسته ماندگاری است.
          </h2>

          <p className="text-lg text-text-muted mb-12 max-w-lg mx-auto">
            همین امروز به هزاران کاربری بپیوندید که مدیریت دارایی‌های طلای خود را به زروی سپرده‌اند.
          </p>

          <Link href="/register">
            <Button variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white hover:text-surface-dark hover:border-white">
              شروع در زروی
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
