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
    <footer className="border-t border-[#262A56] bg-gradient-to-b from-[#14162B] via-[#0E1020] to-[#000000] text-[#FAF8F5] pt-24 pb-12 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">

        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-white/10">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#1A1D3D] border border-white/10 text-[#B8621B]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FAF8F5] mb-1">اصالت تضمین‌شده شمش</h4>
              <p className="text-xs text-[#C5BFB4] leading-relaxed">
                تمام محصولات دارای کد شناسه پیگیری و عیار ۹۹۹.۹ استاندارد ملی هستند.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#1A1D3D] border border-white/10 text-[#B8621B]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FAF8F5] mb-1">تسویه آنی و برخط</h4>
              <p className="text-xs text-[#C5BFB4] leading-relaxed">
                انتقال آنی موجودی فروش به کارت‌های بانکی عضو شبکه شتاب در ۲۴ ساعت شبانه‌روز.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#1A1D3D] border border-white/10 text-[#B8621B]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FAF8F5] mb-1">پشتیبانی اختصاصی آتلیه</h4>
              <p className="text-xs text-[#C5BFB4] leading-relaxed">
                تیم کارشناسان زروی آماده پاسخگویی و راهنمایی سرمایه‌گذاران هستند.
              </p>
            </div>
          </div>
        </div>

        {/* Main Links Grid */}
        <div className="py-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand & Manifesto */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <span className="diamond-motif !w-2 !h-2" />
              <span className="text-xl tracking-brand font-bold text-[#FAF8F5]">
                ZARAVI
              </span>
            </Link>
            <p className="text-xs text-[#C5BFB4] leading-relaxed mb-6 font-light max-w-xs">
              پلتفرم مدرن خرید، فروش و تحویل فیزیکی طلای دیجیتال با عیار استاندارد و شفافیت مطلق.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#C5BFB4]">
              <Mail className="w-3.5 h-3.5 text-[#B8621B]" />
              <span>info@zaravi.gold</span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs tracking-brand font-semibold text-[#E3CCAE] mb-6">
              مجموعه‌ها
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#C5BFB4] hover:text-[#FAF8F5] transition-colors duration-300 flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpLeft className="w-3 h-3 text-[#B8621B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-brand font-semibold text-[#E3CCAE] mb-6">
              خدمات مالی
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#C5BFB4] hover:text-[#FAF8F5] transition-colors duration-300 flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpLeft className="w-3 h-3 text-[#B8621B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-brand font-semibold text-[#E3CCAE] mb-6">
              آتلیه زروی
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#C5BFB4] hover:text-[#FAF8F5] transition-colors duration-300 flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpLeft className="w-3 h-3 text-[#B8621B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs tracking-brand font-semibold text-[#E3CCAE] mb-6">
              قوانین
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-[#C5BFB4] hover:text-[#FAF8F5] transition-colors duration-300 flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpLeft className="w-3 h-3 text-[#B8621B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Monumental Footer Brand Typography */}
        <div className="py-12 border-t border-b border-white/10 flex justify-center items-center overflow-hidden">
          <span className="text-[clamp(3.5rem,14vw,14rem)] font-extrabold tracking-[0.18em] text-white/5 select-none pointer-events-none leading-none">
            ZARAVI
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C5BFB4]">
          <p>© تمامی حقوق برای آتلیه و پلتفرم زروی (Zaravi Gold) محفوظ است.</p>
          <div className="flex items-center gap-3">
            <span className="diamond-motif !w-1.5 !h-1.5" />
            <span>طراحی بر پایه استانداردهای اتحادیه طلا و مسکوکات</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
