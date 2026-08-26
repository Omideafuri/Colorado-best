import Image from 'next/image';
import type { Metadata } from 'next';
import { Shield, Award, Landmark, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'درباره خانه زروی — اصالت، هنر و فناوری',
  description: 'آشنایی با تاریخچه، رسالت، ارزش‌ها و استانداردهای خلوص و عیارسنجی در پلتفرم طلای دیجیتال زروی.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#161412] selection:bg-[#B35817] selection:text-white pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10">

        {/* Masthead Header */}
        <div className="border-b border-[#E8E2D7] pb-10 mb-12">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="diamond-motif" />
            <span className="text-xs tracking-brand text-[#7E776C] font-semibold uppercase">داستان و هویت آتلیه</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#161412] tracking-tight mb-4">
            معماری ارزش در جهان طلا
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#4A453E] leading-relaxed font-light max-w-2xl">
            خانه زروی با تلفیق هنر سنتی طلاکاری پارسی و زیرساخت پیشرفته دفتر کل دیجیتال، امن‌ترین بستر سرمایه‌گذاری فلزات گرانبها را خلق کرده است.
          </p>
        </div>

        {/* Studio Photographic Feature */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8E2D7] bg-white p-3 shadow-subtle">
            <Image
              src="/images/craftsmanship.jpg"
              alt="آتلیه طلاسازی زروی"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-xl sm:rounded-2xl"
            />
          </div>
          <div className="space-y-4">
            <span className="text-xs tracking-brand font-bold text-[#B35817] uppercase">اصالت و شایستگی</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#14182E] tracking-tight">
              پشتوانه‌ای فراتر از ارقام دیجیتال
            </h2>
            <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed font-light">
              در زروی، هر گرم طلای ثبت‌شده در پنل کاربری شما معادل شمش‌های واقعی با کد رهگیری است که در خزانه‌های امن بانکی سپرده‌گذاری شده‌اند.
            </p>
            <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed font-light">
              امکان تبدیل لحظه‌ای دارایی به شمش فیزیکی و تحویل درب منزل در هر زمان برای تمامی کاربران فراهم است.
            </p>
          </div>
        </div>

        {/* 4 Pillars Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-16">
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D7] shadow-subtle">
            <Shield className="w-8 h-8 text-[#B35817] mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-[#161412] mb-2">شفافیت ۱۰۰٪ و تفکیک ذخایر</h3>
            <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed font-light">
              حسابرسی‌های ادواری توسط مراجع رسمی مستقل تضمین‌کننده تطابق کامل دارایی‌های کاربران با موجودی واقعی خزانه است.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D7] shadow-subtle">
            <Award className="w-8 h-8 text-[#B35817] mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-[#161412] mb-2">عیارسنجی آزمایشگاهی ری‌گیری</h3>
            <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed font-light">
              تمامی شمش‌های فیزیکی دارای گواهی آزمایشگاه‌های رسمی ری‌گیری تحت نظارت سازمان ملی استاندارد ایران هستند.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D7] shadow-subtle">
            <Landmark className="w-8 h-8 text-[#B35817] mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-[#161412] mb-2">خزانه امن بانکی کشور</h3>
            <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed font-light">
              ذخایر طلای مشتریان در صندوق‌های امانات درجه‌یک بانکی با بالاترین پروتکل‌های امنیتی نگهداری می‌شوند.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D7] shadow-subtle">
            <Scale className="w-8 h-8 text-[#B35817] mb-4" />
            <h3 className="text-base sm:text-lg font-bold text-[#161412] mb-2">انطباق با موازین فقهی و قانونی</h3>
            <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed font-light">
              معاملات بر اساس بیع قطعی و تحویل آنی ساختاربندی شده و کلیه ضوابط بانک مرکزی و اتحادیه رعایت می‌گردد.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}