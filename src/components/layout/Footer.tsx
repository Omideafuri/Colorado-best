import Link from 'next/link';

const footerLinks = {
  services: [
    { label: 'خرید طلا', href: '/buy' },
    { label: 'فروش طلا', href: '/sell' },
    { label: 'قیمت لحظه‌ای', href: '/prices' },
    { label: 'پس‌انداز', href: '/savings' },
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
    <footer className="border-t border-border bg-surface-secondary">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Main Footer */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-lg tracking-brand font-semibold text-text-primary">
                ZARAVI
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              پلتفرم خرید، فروش و سرمایه‌گذاری طلای دیجیتال.
              طلا را ساده بخرید، امن نگه دارید و سرمایه‌تان را رشد دهید.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs tracking-brand text-text-muted mb-6">
              خدمات
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs tracking-brand text-text-muted mb-6">
              زروی
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs tracking-brand text-text-muted mb-6">
              قوانین
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © تمامی حقوق برای زروی محفوظ است.
          </p>
          <div className="flex items-center gap-3 text-text-muted">
            <div className="w-px h-3 bg-border" />
            <span className="diamond-motif" />
            <div className="w-px h-3 bg-border" />
          </div>
        </div>
      </div>
    </footer>
  );
}
