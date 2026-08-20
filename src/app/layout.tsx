import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
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
  themeColor: '#d4911e',
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
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className="min-h-screen font-body antialiased">
        {children}
      </body>
    </html>
  );
}
