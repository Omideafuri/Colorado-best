import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'درباره خانه زروی — اصالت، هنر و مهندسی ارزش',
  description: 'داستان پیدایش زروی، استانداردهای ساخت و منشور شفافیت در نگهداری طلای فیزیکی.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#B8621B] selection:text-white pt-20">

      {/* Hero Statement (Deep Midnight Lapis #262A56) */}
      <section className="section-editorial px-6 md:px-10 bg-atmospheric-navy text-white border-b border-white/10 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="diamond-motif" />
            <span className="text-xs tracking-brand text-[#E3CCAE]">اصالت و منشور خانه زروی</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold text-white leading-[1.15] tracking-tight mb-8">
              پیوند میان خلوص ماده و نوآوری دیجیتال.
            </h1>
            <p className="text-base sm:text-xl text-[#C5BFB4] leading-relaxed font-light max-w-2xl">
              زروی برای پاسخ به نیازی بنیادین متولد شد: بازتعریف شیوه مالکیت و انتقال گرانبهاترین دارایی تاریخ بشر در دنیایی شفاف و بدون مرز.
            </p>
          </div>
        </div>
      </section>

      {/* Image & Manifesto (Warm Champagne Canvas #FAF8F5) */}
      <section className="section-editorial px-6 md:px-10 bg-[#FAF8F5]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E8E1D5] bg-white p-3 shadow-xl">
                <Image
                  src="/images/brand_story.jpg"
                  alt="Zaravi Philosophy Still Life"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 text-[#4A463F] leading-relaxed">
              <span className="text-xs tracking-brand font-bold text-[#B8621B] block uppercase">منشور ارزش‌ها</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#262A56] tracking-tight">
                طلا؛ ذخیره ماندگار تلاش و زمان انسان
              </h2>
              <p className="text-sm sm:text-base font-light">
                در طول هزاره‌ها، طلا تنها استانداردی بوده که هیچ دولتی نتوانسته ارزش آن را با تصمیمات مقطعی مخدوش کند. ما در زروی این خلوص تاریخی را با سیستم‌های مدرن فناوری، حسابداری دوطرفه و دفاتر کل رمزنگاری‌شده پیوند زده‌ایم.
              </p>
              <p className="text-sm sm:text-base font-light">
                هر میلی‌گرم طلایی که در حساب شما ثبت می‌شود، قطعه‌ای واقعی و فیزیکی از فلز زرین است که در خزانه‌های امن بانکی و تحت نظارت دقیق بازرسان مستقل نگهداری می‌شود.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section (Deep Obsidian Black #000000) */}
      <section className="section-editorial px-6 md:px-10 bg-atmospheric-black text-white border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 lg:order-2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 bg-[#14162B] p-3 shadow-2xl">
                <Image
                  src="/images/craftsmanship.jpg"
                  alt="Zaravi Master Craftsmanship"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1 space-y-6 text-[#C5BFB4] leading-relaxed font-light">
              <div className="flex items-center gap-3 mb-4">
                <span className="diamond-motif" />
                <span className="text-xs tracking-brand text-[#E3CCAE]">هنر و استانداردهای کارگاه</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                تعهد به خلوص ۷۵۰ و ۹۹۹.۹
              </h2>
              <p className="text-sm sm:text-base">
                از عیارسنجی در آزمایشگاه‌های معتمد ری‌گیری تا ضرب شمش‌های استاندارد با هولوگرام‌های سه‌بعدی و بسته‌بندی پلمپ امنیتی، تک‌تک مراحل تولید تحت سخت‌گیرانه‌ترین رویه‌های کیفی انجام می‌پذیرد.
              </p>
              <p className="text-sm sm:text-base">
                شما می‌توانید در هر ساعت از شبانه‌روز، معادل طلای حساب خود را با فشردن یک دکمه به فرم فیزیکی سفارش داده و با بسته‌بندی اختصاصی در محل مورد نظر تحویل بگیرید.
              </p>

              <div className="pt-6">
                <Link href="/register">
                  <Button variant="primary" className="px-8 py-3.5 rounded-full text-xs font-semibold shadow-copper-glow flex items-center gap-2">
                    <span>شروع همراهی با زروی</span>
                    <ArrowLeft className="w-4 h-4" />
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