import localFont from 'next/font/local';

export const kalameh = localFont({
  src: [
    {
      path: '../../public/fonts/kalameh/KalamehWeb-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/kalameh/KalamehWeb-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/kalameh/KalamehWeb-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/kalameh/KalamehWeb-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/kalameh/KalamehWeb-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/kalameh/KalamehWeb-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-kalameh',
  display: 'swap',
});
