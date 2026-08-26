import type { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'سوالات متداول',
  description: 'پاسخ به پرسش‌های پرتکرار درباره خرید طلای دیجیتال، پشتوانه فیزیکی خزانه، تحویل شمش و نقدشوندگی در زروی.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141210] selection:bg-[#B8621B] selection:text-white pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-xs text-[#262A56] mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#B8621B]" />
            <span>مرکز راهنمایی و پاسخ به پرسش‌ها</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#141210] tracking-tight">سوالات متداول</h1>
          <p className="text-xs sm:text-sm text-[#4A463F] mt-2 font-light max-w-lg mx-auto">
            پاسخ به سوالات پرتکرار پیرامون نحوه ثبت سفارش، امنیت خزانه طلا و تحویل فیزیکی
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'چگونه می‌توانم در زروی طلای دیجیتال خریداری کنم؟',
              a: 'در کمتر از ۲ دقیقه ثبت‌نام و احراز هویت اولیه را انجام دهید. پس از شارژ ریالی کیف پول از طریق شبکه شتاب، با هر مبلغ دلخواهی می‌توانید بر اساس نرخ لحظه‌ای بازار، طلای ۱۸ یا ۲۴ عیار خریداری فرمایید.'
            },
            {
              q: 'آیا طلای خریداری‌شده دارای پشتوانه فیزیکی واقعی است؟',
              a: 'بله، تک‌تک میلی‌گرم‌های ثبت‌شده در حساب شما متعلق به شمش‌های فیزیکی دارای کد استاندارد اتحادیه است که در گاوصندوق‌های اختصاصی بانکی با پوشش ۱۰۰٪ بیمه حوادث نگهداری می‌شود.'
            },
            {
              q: 'روال دریافت فیزیکی شمش و سکه به چه صورت است؟',
              a: 'شما در هر ساعت از شبانه‌روز می‌توانید از طریق بخش تحویل فیزیکی یا فروشگاه زروی، معادل وزن طلای حساب خود را در قالب شمش‌های وکیوم‌شده ۱ تا ۱۰۰ گرم یا مسکوکات بانکی سفارش دهید تا با پست بیمه‌شده به آدرس شما ارسال گردد.'
            },
            {
              q: 'نقدشوندگی و واریز وجه فروش به چه میزان زمان می‌برد؟',
              a: 'فروش طلا در زروی کاملاً آنی است. مبلغ فروش بلافاصله به کیف پول ریالی شما منظور شده و درخواست برداشت بانکی در اولین چرخه پایا/ساتنا به شماره شبای شما تسویه خواهد شد.'
            },
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <span className="diamond-motif !w-1.5 !h-1.5" />
                <h3 className="text-base sm:text-lg font-bold text-[#262A56]">{faq.q}</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4A463F] leading-relaxed font-light mt-2 pr-4 border-r border-[#E8E1D5]">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}