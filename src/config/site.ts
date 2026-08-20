export const siteConfig = {
  name: 'Zaravi Gold',
  nameFa: 'زروی',
  description: 'پلتفرم خرید، فروش و سرمایهگذاری طلای دیجیتال',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  links: {
    support: '/support',
    terms: '/terms',
    privacy: '/privacy',
  },
  contact: {
    email: 'info@zaravi.gold',
    phone: '021-XXXXXXXX',
  },
} as const;
