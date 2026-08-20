import Link from 'next/link';
import { Shield, Phone, Mail,  } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'خرید طلا', href: '/buy' },
    { label: 'فروش طلا', href: '/sell' },
    { label: 'قیمت لحظهای طلا', href: '/prices' },
    { label: 'پسانداز طلا', href: '/savings' },
    { label: 'تحویل فیزیکی', href: '/delivery' },
  ],
  company: [
    { label: 'درباره زروی', href: '/about' },
    { label: 'سوالات متداول', href: '/faq' },
    { label: 'تماس با ما', href: '/contact' },
    { label: 'بلاگ', href: '/blog' },
  ],
  legal: [
    { label: 'قوانین و مقررات', href: '/terms' },
    { label: 'حریم خصوصی', href: '/privacy' },
    { label: 'افشای ریسک', href: '/risk-disclosure' },
    { label: 'سیاست تحویل', href: '/delivery-policy' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500 text-white font-bold text-lg">
                ز
              </div>
              <span className="text-lg font-bold text-text-primary">
                زروی
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              پلتفرم خرید، فروش و سرمایهگذاری طلای دیجیتال.
              با زروی، طلا را ساده بخرید، امن نگه دارید و سرمایهتان را رشد دهید.
            </p>
            <div className="flex flex-col gap-2 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-text-muted" />
                <span className="font-num">۰۲۱-XXXXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-text-muted" />
                <span>info@zaravi.gold</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              خدمات
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-gold-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              زروی
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-gold-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              قوانین
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-gold-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-xs text-text-muted">
            © تمامی حقوق برای زروی محفوظ است.
          </p>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Shield className="h-4 w-4" />
            <span>تمام تراکنشها رمزنگاری شدهاند</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
