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
    <div className="min-h-screen bg-[#FAF8F4] text-[#161412] selection:bg-[#B35817] selection:text-white pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-10">

        {/* Header */}
        <div className="border-b border-[#E8E2D7] pb-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="diamond-motif" />
              <span className="text-xs tracking-brand text-[#7E776C] font-semibold uppercase">نرخ‌های رسمی و لحظه‌ای بازار ایران</span>
            </div>
            
            {/* Timestamp Badge */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#7E776C] bg-white px-3.5 py-1.5 border border-[#E8E2D7] rounded-full self-start md:self-auto shadow-xs">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              <span className="font-semibold text-[#14182E]">منبع: AlanChand</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#7E776C]" />
                <span className="font-num">
                  {formatDate(new Date(marketRates.lastUpdated), 'relative')}
                </span>
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#161412] tracking-tight mb-3">
            تابلوی معاملات زروی
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#4A453E] leading-relaxed font-light max-w-2xl">
            نرخ‌های اعلامی به صورت برخط از تابلوی AlanChand استخراج شده و مبنای تسویه معاملات رسمی پلتفرم قرار می‌گیرند.
          </p>
        </div>

        {/* Primary 18K Live Trading Terminal Card */}
        <div className="border border-[#E8E2D7] bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 mb-10 shadow-subtle">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#E8E2D7] pb-6 mb-6 gap-4">
            <div>
              <span className="text-xs tracking-brand text-[#B35817] block mb-1.5 font-bold uppercase">شاخص اصلی مبادلات پلتفرم</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#161412]">هر گرم طلای ۱۸ عیار (۷۵۰)</h2>
            </div>
            <div className="text-left">
              <span className="text-[10px] tracking-brand text-[#7E776C] block mb-0.5 font-semibold">قیمت مرجع بازار</span>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold font-num text-[#14182E] tracking-tight">
                {toPersianDigits(formatNumber(refToman))} <span className="text-xs font-normal text-[#7E776C]">تومان</span>
              </p>
              <p className="text-[11px] font-num text-[#7E776C] mt-0.5">
                معادل {toPersianDigits(formatNumber(refToman * 10))} ریال
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <div className="border border-[#E8E2D7] p-5 sm:p-6 bg-[#FAF8F4] rounded-2xl">
              <span className="text-xs text-[#7E776C] block mb-1.5 font-semibold">نرخ خرید زروی از شما (فروش موجودی)</span>
              <p className="text-2xl sm:text-3xl font-bold font-num text-[#161412]">
                {toPersianDigits(formatNumber(sellToman))} <span className="text-xs font-normal text-[#7E776C]">تومان</span>
              </p>
              <p className="text-[11px] font-num text-[#7E776C] mt-0.5">
                معادل {toPersianDigits(formatNumber(sellToman * 10))} ریال
              </p>
              <span className="text-[11px] text-[#7E776C] mt-2 block font-light">تسویه آنی به کیف پول ریالی</span>
            </div>

            <div className="border border-[#E8E2D7] p-5 sm:p-6 bg-[#FAF8F4] rounded-2xl">
              <span className="text-xs text-[#7E776C] block mb-1.5 font-semibold">نرخ فروش زروی به شما (خرید آنلاین)</span>
              <p className="text-2xl sm:text-3xl font-bold font-num text-[#161412]">
                {toPersianDigits(formatNumber(buyToman))} <span className="text-xs font-normal text-[#7E776C]">تومان</span>
              </p>
              <p className="text-[11px] font-num text-[#7E776C] mt-0.5">
                معادل {toPersianDigits(formatNumber(buyToman * 10))} ریال
              </p>
              <span className="text-[11px] text-[#7E776C] mt-2 block font-light">ثبت لحظه‌ای در خزانه با پشتوانه شمش</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-[#E8E2D7] pt-6 gap-4 text-xs sm:text-sm text-[#4A453E]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#B35817]" />
              <span>اسپرد معاملاتی:</span>
              <span className="font-num font-bold text-[#B35817]">{toPersianDigits(formatNumber(spreadToman))} تومان</span>
              <span className="text-[11px] text-[#7E776C]">({toPersianDigits(formatNumber(spreadRial))} ریال)</span>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link href="/buy" className="flex-1 sm:flex-none">
                <Button variant="primary" className="w-full sm:w-auto rounded-full text-xs font-semibold shadow-copper-glow">ورود به پنل خرید طلا</Button>
              </Link>
              <Link href="/sell" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full sm:w-auto rounded-full text-xs font-semibold">فروش موجودی</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Complete Bullion & Coin Market Board */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <span className="diamond-motif" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#161412]">نرخ انواع طلا، مسکوکات و انس جهانی</h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#7E776C]">
              <Database className="w-3.5 h-3.5 text-[#B35817]" />
              <span>AlanChand API</span>
            </div>
          </div>

          <div className="border border-[#E8E2D7] bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E8E2D7] bg-[#FAF8F4] text-[#7E776C] text-xs">
                    <th className="py-4 px-5 font-semibold">عنوان دارایی</th>
                    <th className="py-4 px-5 font-semibold text-left">قیمت (تومان)</th>
                    <th className="py-4 px-5 font-semibold text-left">معادل ریال (IRR)</th>
                    <th className="py-4 px-5 font-semibold text-left">تغییر ۲۴ ساعته</th>
                    <th className="py-4 px-5 font-semibold text-left">درصد تغییر</th>
                    <th className="py-4 px-5 font-semibold text-center">واحد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D7]">
                  {allMarketItems.map((item) => {
                    const isPositive = item.changePercent >= 0;
                    return (
                      <tr key={item.key} className="hover:bg-[#FAF8F4]/75 transition-colors">
                        <td className="py-4 px-5 font-medium text-[#161412]">
                          <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-bold">{item.titleFa}</span>
                            <span className="text-[10px] text-[#7E776C] font-mono">{item.titleEn}</span>
                          </div>
                        </td>

                        <td className="py-4 px-5 text-left font-num font-bold text-xs sm:text-sm text-[#161412]">
                          {toPersianDigits(formatNumber(item.priceToman))}{' '}
                          <span className="text-[10px] font-normal text-[#7E776C]">
                            {item.key === 'goldOunce' ? 'دلار' : 'تومان'}
                          </span>
                        </td>

                        <td className="py-4 px-5 text-left font-num text-[11px] text-[#7E776C]">
                          {item.key === 'goldOunce' ? (
                            '—'
                          ) : (
                            `${toPersianDigits(formatNumber(item.priceRial))} ریال`
                          )}
                        </td>

                        <td className="py-4 px-5 text-left font-num text-xs">
                          <div className={`inline-flex items-center gap-1 font-medium ${isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            <span>{toPersianDigits(formatNumber(Math.abs(item.changeToman)))}</span>
                          </div>
                        </td>

                        <td className="py-4 px-5 text-left font-num text-xs">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isPositive ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                          }`}>
                            {isPositive ? '+' : ''}{toPersianDigits(item.changePercent.toFixed(2))}٪
                          </span>
                        </td>

                        <td className="py-4 px-5 text-center text-[#4A453E] text-xs">
                          {item.unit}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[#E8E2D7] p-4 bg-[#FAF8F4] text-xs text-[#7E776C] flex flex-col sm:flex-row justify-between items-center gap-2 font-light">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-[#7E776C]" />
                <span>نرخ‌ها بر اساس استعلام مستقیم لحظه‌ای نمایش داده می‌شوند.</span>
              </div>
              <span className="font-num text-[#7E776C]">
                زمان استعلام: {formatDate(new Date(marketRates.lastUpdated), 'datetime')}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}