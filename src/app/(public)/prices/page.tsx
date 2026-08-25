import Link from 'next/link';
import type { Metadata } from 'next';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { fetchAlanChandMarketRates } from '@/lib/providers';
import { formatNumber, toPersianDigits, formatDate } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Clock, ShieldCheck, RefreshCw, Database } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'تابلوی رسمی نرخ طلا و مسکوکات — زروی',
  description: 'قیمت لحظه‌ای و رسمی بازار طلای ۱۸ و ۲۴ عیار، مثقال، مسکوکات بهار آزادی و انس طلا از منبع AlanChand.',
};

export default async function PricesPage() {
  const [snapshot, marketRates] = await Promise.all([
    getLatestPriceSnapshot('18K'),
    fetchAlanChandMarketRates(),
  ]);

  const buyRial = snapshot.buyPriceRial;
  const sellRial = snapshot.sellPriceRial;
  const refRial = snapshot.referencePriceRial;

  const buyToman = Number(buyRial / BigInt(10));
  const sellToman = Number(sellRial / BigInt(10));
  const refToman = Number(refRial / BigInt(10));
  const spreadToman = buyToman - sellToman;
  const spreadRial = Number(refRial) > 0 ? Number(buyRial - sellRial) : spreadToman * 10;

  const allMarketItems = [
    marketRates.gold18k,
    marketRates.gold24k,
    marketRates.mesghal,
    marketRates.coinEmami,
    marketRates.coinBahar,
    marketRates.coinHalf,
    marketRates.coinQuarter,
    marketRates.goldOunce,
  ];

  return (
    <div className="min-h-screen bg-surface-secondary selection:bg-gold-200 pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6 md:px-10">

        {/* Header */}
        <div className="border-b border-border pb-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="diamond-motif" />
              <span className="text-xs tracking-brand text-text-muted">نرخ‌های رسمی و لحظه‌ای بازار ایران</span>
            </div>
            
            {/* Timestamp & Source Badge */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted bg-surface px-3.5 py-1.5 border border-border self-start md:self-auto">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-text-primary">منبع: AlanChand</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-text-muted" />
                <span className="font-num">
                  {formatDate(new Date(marketRates.lastUpdated), 'relative')}
                </span>
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary tracking-tight mb-4">
            تابلوی معاملات زروی
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed font-light max-w-2xl">
            نرخ‌های اعلامی به صورت مستقیم از منبع رسمی AlanChand دریافت شده و قیمت‌ها بر پایه تومان (اصلی) و ریال (معادل بانکی) نمایش داده می‌شوند.
          </p>
        </div>

        {/* Primary 18K Live Trading Terminal Card */}
        <div className="border border-border bg-surface p-8 md:p-12 mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-border pb-8 mb-8 gap-4">
            <div>
              <span className="text-xs tracking-brand text-gold-600 block mb-2 font-medium">شاخص اصلی مبادلات پلتفرم</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-text-primary">هر گرم طلای ۱۸ عیار (۷۵۰)</h2>
            </div>
            <div className="text-left">
              <span className="text-xs tracking-brand text-text-muted block mb-1">قیمت مرجع بازار</span>
              <p className="text-3xl md:text-4xl font-semibold font-num text-text-primary tracking-tight">
                {toPersianDigits(formatNumber(refToman))} <span className="text-sm font-normal text-text-muted">تومان</span>
              </p>
              <p className="text-xs font-num text-text-muted mt-1">
                معادل {toPersianDigits(formatNumber(refToman * 10))} ریال
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-border-light p-6 bg-surface-secondary">
              <span className="text-xs text-text-muted block mb-2 font-medium">نرخ خرید زروی از شما (فروش موجودی)</span>
              <p className="text-2xl md:text-3xl font-semibold font-num text-text-primary">
                {toPersianDigits(formatNumber(sellToman))} <span className="text-sm font-normal text-text-muted">تومان</span>
              </p>
              <p className="text-xs font-num text-text-muted mt-1">
                معادل {toPersianDigits(formatNumber(sellToman * 10))} ریال
              </p>
              <span className="text-xs text-text-muted mt-2 block">تسویه آنی به کیف پول ریالی</span>
            </div>

            <div className="border border-border-light p-6 bg-surface-secondary">
              <span className="text-xs text-text-muted block mb-2 font-medium">نرخ فروش زروی به شما (خرید آنلاین)</span>
              <p className="text-2xl md:text-3xl font-semibold font-num text-text-primary">
                {toPersianDigits(formatNumber(buyToman))} <span className="text-sm font-normal text-text-muted">تومان</span>
              </p>
              <p className="text-xs font-num text-text-muted mt-1">
                معادل {toPersianDigits(formatNumber(buyToman * 10))} ریال
              </p>
              <span className="text-xs text-text-muted mt-2 block">ثبت لحظه‌ای در خزانه با پشتوانه شمش</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-border pt-6 gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>اسپرد معاملاتی:</span>
              <span className="font-num font-semibold text-gold-600">{toPersianDigits(formatNumber(spreadToman))} تومان</span>
              <span className="text-xs text-text-muted">({toPersianDigits(formatNumber(spreadRial))} ریال)</span>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <Link href="/buy" className="flex-1 sm:flex-none">
                <Button className="w-full sm:w-auto">ورود به پنل خرید طلا</Button>
              </Link>
              <Link href="/sell" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full sm:w-auto">فروش موجودی</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Complete Bullion & Coin Market Board */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="diamond-motif" />
              <h2 className="text-xl md:text-2xl font-semibold text-text-primary">نرخ انواع طلا، مسکوکات و انس جهانی</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Database className="w-3.5 h-3.5 text-gold-600" />
              <span>منبع: AlanChand API</span>
            </div>
          </div>

          <div className="border border-border bg-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary text-text-muted text-xs tracking-wider">
                    <th className="py-4 px-6 font-medium">عنوان دارایی</th>
                    <th className="py-4 px-6 font-medium text-left">قیمت (تومان / اصلی)</th>
                    <th className="py-4 px-6 font-medium text-left">معادل ریال (IRR)</th>
                    <th className="py-4 px-6 font-medium text-left">تغییر ۲۴ ساعته</th>
                    <th className="py-4 px-6 font-medium text-left">درصد تغییر</th>
                    <th className="py-4 px-6 font-medium text-center">واحد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {allMarketItems.map((item) => {
                    const isPositive = item.changePercent >= 0;
                    return (
                      <tr key={item.key} className="hover:bg-surface-hover/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-text-primary">
                          <div className="flex flex-col">
                            <span className="text-base font-semibold">{item.titleFa}</span>
                            <span className="text-xs text-text-muted font-mono tracking-tight">{item.titleEn}</span>
                          </div>
                        </td>

                        {/* Primary Price: Toman */}
                        <td className="py-4 px-6 text-left font-num font-semibold text-base text-text-primary">
                          {toPersianDigits(formatNumber(item.priceToman))}{' '}
                          <span className="text-xs font-normal text-text-muted">
                            {item.key === 'goldOunce' ? 'دلار' : 'تومان'}
                          </span>
                        </td>

                        {/* Secondary Price: Rial */}
                        <td className="py-4 px-6 text-left font-num text-xs text-text-muted">
                          {item.key === 'goldOunce' ? (
                            '—'
                          ) : (
                            `${toPersianDigits(formatNumber(item.priceRial))} ریال`
                          )}
                        </td>

                        {/* 24h Change */}
                        <td className="py-4 px-6 text-left font-num text-xs">
                          <div className={`inline-flex items-center gap-1 font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                            <span>{toPersianDigits(formatNumber(Math.abs(item.changeToman)))}</span>
                          </div>
                        </td>

                        {/* Change Percent */}
                        <td className="py-4 px-6 text-left font-num text-xs">
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                            isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {isPositive ? '+' : ''}{toPersianDigits(item.changePercent.toFixed(2))}٪
                          </span>
                        </td>

                        {/* Unit */}
                        <td className="py-4 px-6 text-center text-text-secondary text-xs">
                          {item.unit}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer / Security Note */}
            <div className="border-t border-border p-4 bg-surface-secondary text-xs text-text-muted flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-text-muted" />
                <span>داده‌های برخط از AlanChand (الان چند) هر ۲۰ ثانیه نوسازی می‌شوند.</span>
              </div>
              <span className="font-num text-text-muted">
                زمان به‌روزرسانی منبع: {formatDate(new Date(marketRates.lastUpdated), 'datetime')}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}