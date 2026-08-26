import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'تماس با آتلیه — زروی',
  description: 'راه‌های ارتباط با دفتر مرکزی و بخش پشتیبانی مشتریان پلتفرم زروی.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#161412] selection:bg-[#B35817] selection:text-white pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10">

        <div className="border-b border-[#E8E2D7] pb-8 mb-10">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="diamond-motif" />
            <span className="text-xs tracking-brand text-[#7E776C] font-semibold uppercase">میز ارتباط با آتلیه</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#161412] tracking-tight mb-3">
            تماس با کارشناسان زروی
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#4A453E] font-light max-w-xl">
            تیم پشتیبانی اختصاصی و مشاوران سرمایه‌گذاری زروی در کلیه روزهای کاری پاسخگوی شما هستند.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Contact Info Cards */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-[#E8E2D7] shadow-subtle flex items-start gap-4">
              <div className="p-3 bg-[#FAF8F4] text-[#B35817] rounded-xl border border-[#E8E2D7]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs text-[#7E776C] font-semibold mb-1">مرکز تماس پشتیبانی</h4>
                <p className="text-sm font-bold font-num text-[#14182E]" dir="ltr">۰۲۱-۸۸۸۸۴۴۲۲</p>
                <span className="text-[11px] text-[#7E776C] font-light">شنبه تا چهارشنبه ۹ الی ۱۸</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-[#E8E2D7] shadow-subtle flex items-start gap-4">
              <div className="p-3 bg-[#FAF8F4] text-[#B35817] rounded-xl border border-[#E8E2D7]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs text-[#7E776C] font-semibold mb-1">پست الکترونیک رسمی</h4>
                <p className="text-sm font-bold font-mono text-[#14182E]">concierge@zaravi.gold</p>
                <span className="text-[11px] text-[#7E776C] font-light">پاسخگویی ظرف حداکثر ۲ ساعت کاری</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-[#E8E2D7] shadow-subtle flex items-start gap-4">
              <div className="p-3 bg-[#FAF8F4] text-[#B35817] rounded-xl border border-[#E8E2D7]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs text-[#7E776C] font-semibold mb-1">دفتر مرکزی</h4>
                <p className="text-xs text-[#161412] leading-relaxed font-light">تهران، خیابان ولیعصر، برج تجارت الکترونیک، طبقه ۱۲، واحد ۱۲۰۴</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7 bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#E8E2D7] shadow-subtle">
            <h3 className="text-lg sm:text-xl font-bold text-[#161412] mb-6">ارسال پیام یا درخواست مشاوره اختصاصی</h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#161412] mb-1.5">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    placeholder="مثال: آرش امینی"
                    className="w-full rounded-xl border border-[#E8E2D7] bg-[#FAF8F4] px-4 py-3 text-xs sm:text-sm text-[#161412] outline-none focus:border-[#B35817]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#161412] mb-1.5">شماره تماس (همراه)</label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="09123456789"
                    className="w-full rounded-xl border border-[#E8E2D7] bg-[#FAF8F4] px-4 py-3 text-xs sm:text-sm font-num text-left text-[#161412] outline-none focus:border-[#B35817]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#161412] mb-1.5">موضوع پیام</label>
                <input
                  type="text"
                  placeholder="مشاوره خرید عمده / پیگیری سفارش فیزیکی"
                  className="w-full rounded-xl border border-[#E8E2D7] bg-[#FAF8F4] px-4 py-3 text-xs sm:text-sm text-[#161412] outline-none focus:border-[#B35817]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#161412] mb-1.5">متن پیام</label>
                <textarea
                  rows={4}
                  placeholder="شرح درخواست خود را بنویسید..."
                  className="w-full rounded-xl border border-[#E8E2D7] bg-[#FAF8F4] px-4 py-3 text-xs sm:text-sm text-[#161412] outline-none focus:border-[#B35817] resize-none"
                />
              </div>

              <Button type="button" variant="primary" className="w-full py-3.5 rounded-full text-xs font-bold shadow-copper-glow">
                ثبت و ارسال پیام به پشتیبانی
              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}