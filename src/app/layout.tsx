import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';
import { kalameh } from '@/app/fonts';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.nameFa} — ${siteConfig.description}`,
    template: `%s | ${siteConfig.nameFa}`,
  },
  description: siteConfig.description,
  keywords: [
    'خرید طلا',
    'فروش طلا',
    'قیمت طلا',
    'سرمایه‌گذاری طلا',
    'طلای دیجیتال',
    'زروی',
    'Zaravi Gold',
  ],
  authors: [{ name: 'Zaravi Gold', url: siteConfig.url }],
  openGraph: {
    title: `${siteConfig.nameFa} — ${siteConfig.description}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.nameFa,
    locale: 'fa_IR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#262A56',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={kalameh.variable} suppressHydrationWarning>
      <body className={`min-h-screen font-body antialiased ${kalameh.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
