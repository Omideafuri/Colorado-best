import type { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'سوالات متداول — خانه طلای دیجیتال زروی',
  description: 'پاسخ به سوالات پرتکرار درباره خرید، فروش، احراز هویت، نگهداری در خزانه و تحویل فیزیکی طلا.',
};

const faqs = [
  {
    q: 'حداقل مبلغ خرید طلا در زروی چقدر است؟',
    a: 'شما می‌توانید با هر مبلغی (از حداقل ۱۰۰ هزار تومان) اقدام به خرید طلای ۱۸ عیار نمایید. هیچ محدودیتی برای خرید‌های خرد وجود ندارد.',
  },
  {
    q: 'طلاهای خریداری‌شده چگونه نگهداری می‌شوند؟',
    a: 'تمامی طلاهای دیجیتال ثبت‌شده در پنل شما، به صورت ۱۰۰٪ معادل شمش‌های استاندارد در خزانه‌های بانکی معتبر نگهداری و بیمه شده‌اند.',
  },
  {
    q: 'آیا امکان دریافت فیزیکی طلا وجود دارد؟',
    a: 'بله. در هر زمان می‌توانید با مراجعه به بخش تحویل فیزیکی در پنل کاربری، طلای خود را در قالب شمش‌های ۱ تا ۱۰۰ گرمی وکیوم‌شده با پست بیمه‌شده دریافت کنید.',
  },
  {
    q: 'تسویه فروش طلا به چه صورت انجام می‌شود؟',
    a: 'پس از فروش طلا در پنل، مبلغ ریالی بلافاصله در کیف پول شما منظور شده و می‌توانید در هر ساعت از شبانه‌روز درخواست تسویه به شماره شبای بانکی خود را ثبت نمایید.',
  },
  {
    q: 'آیا خرید طلا در زروی شامل مالیات بر ارزش افزوده می‌شود؟',
    a: 'خیر. طبق قوانین جدید مالیاتی کشور، اصل طلای خام و شمش‌های استاندارد از پرداخت مالیات بر ارزش افزوده معاف هستند و تنها کارمزد پلتفرم محاسبه می‌گردد.',
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#161412] selection:bg-[#B35817] selection:text-white pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-10">

        <div className="border-b border-[#E8E2D7] pb-8 mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D7] text-xs text-[#7E776C] mb-3 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#B35817]" />
            <span className="font-medium">راهنمای جامع پلتفرم</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#161412] tracking-tight mb-3">
            پرسش‌های متداول
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#4A453E] font-light max-w-lg mx-auto">
            پاسخ سریع به متداول‌ترین پرسش‌های کاربران درباره معاملات و تحویل فیزیکی
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8E2D7] shadow-subtle">
              <h3 className="text-base sm:text-lg font-bold text-[#14182E] mb-2.5 flex items-center gap-2.5">
                <span className="diamond-motif !w-1.5 !h-1.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed font-light pr-4">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}