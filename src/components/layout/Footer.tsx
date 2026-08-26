import Link from 'next/link';
import { ArrowUpLeft, Shield, Clock, Phone, Mail } from 'lucide-react';

const footerLinks = {
  products: [
    { label: 'شمش طلای ۲۴ عیار', href: '/store' },
    { label: 'سکه تمام بهار آزادی', href: '/store' },
    { label: 'سکه طرح جدید (امامی)', href: '/store' },
    { label: 'پلاک و آویز زرین', href: '/store' },
    { label: 'تابلوی کامل نرخ‌ها', href: '/prices' },
  ],
  services: [
    { label: 'خرید آنی طلا', href: '/buy' },
    { label: 'فروش و تسویه فوری', href: '/sell' },
    { label: 'طرح‌های پس‌انداز دوره‌ای', href: '/savings' },
    { label: 'تحویل فیزیکی بیمه‌شده', href: '/delivery' },
    { label: 'کیف پول چندارزی', href: '/wallet' },
  ],
  company: [
    { label: 'درباره خانه زروی', href: '/about' },
    { label: 'استانداردهای عیارسنجی', href: '/about' },
    { label: 'سوالات متداول', href: '/faq' },
    { label: 'تماس با آتلیه', href: '/contact' },
    { label: 'مجموعه‌ مقالات و بینش', href: '/blog' },
  ],
  legal: [
    { label: 'قوانین و مقررات پلتفرم', href: '/terms' },
    { label: 'حریم خصوصی کاربران', href: '/privacy' },
    { label: 'منشور افشای ریسک', href: '/risk-disclosure' },
    { label: 'دستورالعمل تحویل و بیمه', href: '/delivery-policy' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#231506] text-[#FAF8EE] pt-20 pb-12 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">

        {/* Pillar Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pb-14 border-b border-white/10">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#3A230A] border border-white/10 shadow-floating-sm">
            <div className="p-2.5 rounded-xl bg-[#231506] text-[#A4530C] flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white mb-1">اصالت تضمین‌شده شمش</h4>
              <p className="text-xs text-[#DDD7B5] leading-relaxed font-light">
                کلیه شمش‌ها دارای هولوگرام امنیتی، شناسه رهگیری اتحادیه و خلوص ۹۹۹.۹ هستند.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#3A230A] border border-white/10 shadow-floating-sm">
            <div className="p-2.5 rounded-xl bg-[#231506] text-[#A4530C] flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white mb-1">تسویه آنی ریالی شبکه شتاب</h4>
              <p className="text-xs text-[#DDD7B5] leading-relaxed font-light">
                فروش لحظه‌ای موجودی و تسویه آنی به شماره شبای بانکی در ۲۴ ساعت شبانه‌روز.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#3A230A] border border-white/10 shadow-floating-sm">
            <div className="p-2.5 rounded-xl bg-[#231506] text-[#A4530C] flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white mb-1">میز پشتیبانی VIP آتلیه</h4>
              <p className="text-xs text-[#DDD7B5] leading-relaxed font-light">
                کارشناسان اختصاصی زروی آماده ارائه مشاوره به خریداران عمده و سازمانی.
              </p>
            </div>
          </div>
        </div>

        {/* Main Sitemap Links Grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand Manifesto */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <span className="diamond-motif !w-2 !h-2 group-hover:rotate-90 transition-transform duration-500 shadow-floating-amber" />
              <span className="text-lg tracking-brand font-bold text-white group-hover:text-[#EEE9C1] transition-colors">
                ZARAVI
              </span>
            </Link>
            <p className="text-xs text-[#DDD7B5] leading-relaxed mb-6 font-light max-w-xs">
              پلتفرم مدرن مبادله طلای دیجیتال و دریافت فیزیکی شمش و مسکوکات با استانداردهای رسمی کشور.
            </p>
            <div className="flex items-center gap-2.5 text-xs text-[#DDD7B5]">
              <Mail className="w-3.5 h-3.5 text-[#A4530C]" />
              <span className="font-mono text-[11px]">concierge@zaravi.gold</span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs tracking-brand font-bold text-[#EEE9C1] mb-5 uppercase">
              مجموعه‌ها
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#DDD7B5] hover:text-white transition-colors duration-300 flex items-center justify-between group font-light"
                  >
                    <span>{link.label}</span>
                    <ArrowUpLeft className="w-3 h-3 text-[#A4530C] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-brand font-bold text-[#EEE9C1] mb-5 uppercase">
              خدمات مالی
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#DDD7B5] hover:text-white transition-colors duration-300 flex items-center justify-between group font-light"
                  >
                    <span>{link.label}</span>
                    <ArrowUpLeft className="w-3 h-3 text-[#A4530C] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-brand font-bold text-[#EEE9C1] mb-5 uppercase">
              آتلیه زروی
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#DDD7B5] hover:text-white transition-colors duration-300 flex items-center justify-between group font-light"
                  >
                    <span>{link.label}</span>
                    <ArrowUpLeft className="w-3 h-3 text-[#A4530C] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs tracking-brand font-bold text-[#EEE9C1] mb-5 uppercase">
              قوانین و شفافیت
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#DDD7B5] hover:text-white transition-colors duration-300 flex items-center justify-between group font-light"
                  >
                    <span>{link.label}</span>
                    <ArrowUpLeft className="w-3 h-3 text-[#A4530C] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Monumental Watermark */}
        <div className="py-8 border-t border-b border-white/10 flex justify-center items-center overflow-hidden">
          <span className="text-[clamp(3.5rem,14vw,14rem)] font-extrabold tracking-[0.18em] text-white/5 select-none pointer-events-none leading-none">
            ZARAVI
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DDD7B5] font-light">
          <p>© تمامی حقوق مادی و معنوی برای پلتفرم زروی (Zaravi Gold) محفوظ است.</p>
          <div className="flex items-center gap-2">
            <span className="diamond-motif !w-1.5 !h-1.5" />
            <span>پشتوانه ۱۰۰٪ شمش در خزانه‌های امن بانکی کشور</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
