import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'درباره خانه زروی — اصالت، هنر و مهندسی ارزش',
  description: 'داستان پیدایش زروی، استانداردهای ساخت و منشور شفافیت در نگهداری طلای فیزیکی.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-secondary selection:bg-gold-200 pt-20">

      {/* Hero Statement */}
      <section className="section-editorial px-6 md:px-10 bg-atmospheric-ivory border-b border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="diamond-motif" />
            <span className="text-xs tracking-brand text-text-muted">خانه زروی</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold text-text-primary leading-[1.15] tracking-tight mb-8">
              پیوند میان خلوص ماده و نوآوری دیجیتال.
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed font-light max-w-2xl">
              زروی برای پاسخ به نیازی بنیادین متولد شد: بازتعریف شیوه مالکیت و انتقال گرانبهاترین دارایی تاریخ بشر در دنیایی بدون مرز.
            </p>
          </div>
        </div>
      </section>

      {/* Image & Manifesto */}
      <section className="section-editorial px-6 md:px-10 bg-surface">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] image-hover-zoom border border-border bg-surface-secondary">
                <Image
                  src="/images/brand_story.jpg"
                  alt="Zaravi Philosophy Still Life"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 text-text-secondary leading-relaxed">
              <span className="text-xs tracking-brand text-text-muted block">منشور ارزش‌ها</span>
              <h2 className="text-3xl font-semibold text-text-primary tracking-tight">
                طلا؛ ذخیره ماندگار تلاش و زمان انسان
              </h2>
              <p>
                در طول هزاره‌ها، طلا تنها استانداردی بوده که هیچ دولتی نتوانسته ارزش آن را با تصمیمات مقطعی مخدوش کند. ما در زروی این خلوص تاریخی را با سیستم‌های مدرن فناوری، حسابداری دوطرفه و دفاتر کل رمزنگاری‌شده پیوند زده‌ایم.
              </p>
              <p>
                هر میلی‌گرم طلایی که در حساب شما ثبت می‌شود، قطعه‌ای واقعی و فیزیکی از فلز زرین است که در خزانه‌های امن بانکی و تحت نظارت دقیق بازرسان مستقل نگهداری می‌شود.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="section-editorial px-6 md:px-10 bg-surface-dark text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 lg:order-2">
              <div className="relative aspect-[4/3] image-hover-zoom border border-neutral-800 bg-[#1A1816]">
                <Image
                  src="/images/craftsmanship.jpg"
                  alt="Zaravi Master Craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1 space-y-6 text-neutral-300 leading-relaxed font-light">
              <div className="flex items-center gap-3 mb-4">
                <span className="diamond-motif !bg-gold-400" />
                <span className="text-xs tracking-brand text-gold-300/80">هنر و استانداردهای کارگاه</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
                تعهد به خلوص ۷۵۰ و ۹۹۹.۹
              </h2>
              <p>
                از عیارسنجی در آزمایشگاه‌های معتمد ری‌گیری تا ضرب شمش‌های استاندارد با هولوگرام‌های سه‌بعدی و بسته‌بندی پلمپ امنیتی، تک‌تک مراحل تولید تحت سخت‌گیرانه‌ترین رویه‌های کیفی انجام می‌پذیرد.
              </p>
              <p>
                شما می‌توانید در هر ساعت از شبانه‌روز، معادل طلای حساب خود را با فشردن یک دکمه به فرم فیزیکی سفارش داده و با بسته‌بندی اختصاصی در محل مورد نظر تحویل بگیرید.
              </p>

              <div className="pt-6">
                <Link href="/register">
                  <Button className="bg-gold-500 hover:bg-gold-600 text-surface-dark font-semibold">
                    شروع همراهی با زروی
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}