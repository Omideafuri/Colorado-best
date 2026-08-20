import Link from 'next/link';
import type { Metadata } from 'next';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { formatNumber, toPersianDigits } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'تابلوی رسمی نرخ طلا — زروی',
  description: 'قیمت زنده طلای ۱۸ عیار، اسپرد معاملاتی و تحلیل تغییرات روزانه.',
};

export default async function PricesPage() {
  const snapshot = await getLatestPriceSnapshot('18K');
  const buyToman = Number(snapshot.buyPriceRial / BigInt(10));
  const sellToman = Number(snapshot.sellPriceRial / BigInt(10));
  const refToman = Number(snapshot.referencePriceRial / BigInt(10));
  const spreadToman = buyToman - sellToman;

  return (
    <div className="min-h-screen bg-surface-secondary selection:bg-gold-200 pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6 md:px-10">

        {/* Header */}
        <div className="border-b border-border pb-10 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="diamond-motif" />
            <span className="text-xs tracking-brand text-text-muted">نرخ‌های رسمی و لحظه‌ای</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight mb-4">
            تابلوی معاملات زروی
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed font-light max-w-xl">
            نرخ‌های اعلامی به صورت خودکار با نوسانات بازار طلا و ارز به‌روزرسانی می‌شوند.
          </p>
        </div>

        {/* Live Terminal Card */}
        <div className="border border-border bg-surface p-8 md:p-14 mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-border pb-8 mb-8 gap-4">
            <div>
              <span className="text-xs tracking-brand text-text-muted block mb-2">ZARAVI MARKET INDEX</span>
              <h2 className="text-2xl font-semibold text-text-primary">هر گرم طلای ۱۸ عیار (۷۵۰)</h2>
            </div>
            <div className="text-left">
              <span className="text-xs tracking-brand text-text-muted block mb-1">قیمت مبنای بازار</span>
              <p className="text-3xl md:text-4xl font-semibold font-num text-text-primary tracking-tight">
                {toPersianDigits(formatNumber(refToman))} <span className="text-sm font-normal text-text-muted">تومان</span>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="border border-border-light p-6 bg-surface-secondary">
              <span className="text-xs text-text-muted block mb-2 font-medium">نرخ خرید زروی از شما (فروش کاربر)</span>
              <p className="text-2xl md:text-3xl font-semibold font-num text-text-primary">
                {toPersianDigits(formatNumber(sellToman))} <span className="text-sm font-normal text-text-muted">تومان</span>
              </p>
            </div>

            <div className="border border-border-light p-6 bg-surface-secondary">
              <span className="text-xs text-text-muted block mb-2 font-medium">نرخ فروش زروی به شما (خرید کاربر)</span>
              <p className="text-2xl md:text-3xl font-semibold font-num text-text-primary">
                {toPersianDigits(formatNumber(buyToman))} <span className="text-sm font-normal text-text-muted">تومان</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-border pt-6 gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-3">
              <span>اسپرد پلتفرم:</span>
              <span className="font-num font-semibold text-gold-600">{toPersianDigits(formatNumber(spreadToman))} تومان</span>
              <span className="text-xs text-text-muted">(۱.۵٪ کارمزد تضمین‌شده)</span>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <Link href="/buy" className="flex-1 sm:flex-none">
                <Button className="w-full sm:w-auto">ورود به پنل خرید</Button>
              </Link>
              <Link href="/sell" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full sm:w-auto">فروش موجودی</Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}