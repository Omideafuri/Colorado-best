'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { sellGoldAction } from '../actions';
import { Button } from '@/components/ui/button';
import { formatNumber, toPersianDigits } from '@/lib/utils/format';
import { ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react';

export default function SellPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [weightGrams, setWeightGrams] = useState('0.5');
  const [priceData, setPriceData] = useState<{ sellPriceToman: number } | null>(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);

  useEffect(() => {
    async function fetchPrice() {
      try {
        setIsLoadingPrice(true);
        const res = await fetch('/api/prices');
        if (res.ok) {
          const data = await res.json();
          setPriceData({
            sellPriceToman: Math.floor(Number(data.sellPriceRial) / 10),
          });
        }
      } catch (err) {
        console.error('Failed to fetch price', err);
      } finally {
        setIsLoadingPrice(false);
      }
    }

    fetchPrice();
    const interval = setInterval(fetchPrice, 15000);
    return () => clearInterval(interval);
  }, []);

  const sellPriceToman = priceData?.sellPriceToman || 3450000;
  const computedAmount = Number(weightGrams) > 0 ? Math.floor(Number(weightGrams) * sellPriceToman) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append('idempotencyKey', window.crypto.randomUUID());
      formData.append('mode', 'BY_WEIGHT');
      const ng = BigInt(Math.floor(Number(weightGrams) * 1_000_000_000));
      formData.append('value', ng.toString());

      const result = await sellGoldAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'خطایی در ثبت سفارش فروش رخ داد');
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pt-4 pb-16">
      <div>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#8C775D] uppercase">میز معاملات طلای ۱۸ عیار</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2A1A08] tracking-tight">فروش موجودی و تسویه آنی</h1>
        <p className="text-xs sm:text-sm text-[#57442D] mt-1 font-light">
          فروش آنی طلای موجود در حساب و واریز نقدی به کیف پول ریالی
        </p>
      </div>

      <div className="floating-card p-6 sm:p-8 space-y-6">
        {/* Live Price Header */}
        <div className="flex items-center justify-between p-4 bg-[#FAF8EE] rounded-2xl border border-[#DFD7B5]">
          <div>
            <span className="text-[10px] text-[#8C775D] block mb-0.5 font-semibold uppercase">نرخ خرید زروی از شما (هر گرم ۱۸ عیار)</span>
            <span className="text-base sm:text-lg font-bold font-num text-[#3A230A]">
              {toPersianDigits(formatNumber(sellPriceToman))} تومان
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#8C775D]">
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingPrice ? 'animate-spin text-[#A4530C]' : ''}`} />
            <span className="font-num text-[11px]">زنده</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3.5 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 rounded-2xl text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#2A1A08] mb-1.5">وزن طلای قابل فروش (گرم)</label>
            <div className="relative">
              <input
                type="text"
                dir="ltr"
                value={weightGrams}
                onChange={(e) => setWeightGrams(e.target.value)}
                placeholder="0.500"
                className="w-full rounded-2xl border border-[#DFD7B5] bg-[#FAF8EE] px-4 py-3.5 text-base sm:text-lg font-num text-left placeholder:text-[#8C775D] focus:border-[#A4530C] focus:bg-white outline-none transition-all"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C775D]">
                گرم
              </span>
            </div>
          </div>

          {/* Computed Output */}
          <div className="p-4 bg-[#FAF8EE] rounded-2xl border border-[#DFD7B5] space-y-2 text-xs">
            <div className="flex justify-between items-center text-[#57442D]">
              <span>مبلغ واریزی به کیف پول:</span>
              <span className="font-num font-bold text-base text-[#2A1A08]">{toPersianDigits(formatNumber(computedAmount))} تومان</span>
            </div>
            <div className="flex justify-between items-center text-[#8C775D] text-[11px]">
              <span>زمان تسویه حساب:</span>
              <span>آنی و بدون معطلی</span>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isPending}
            variant="primary"
            className="w-full py-4 rounded-full text-xs font-bold flex items-center justify-center gap-2"
          >
            <span>فروش قطعی و دریافت وجه</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </form>

        <div className="flex items-center gap-2 text-xs text-[#8C775D] justify-center pt-2">
          <ShieldCheck className="w-4 h-4 text-[#A4530C]" />
          <span>واریز آنی به کیف پول ریالی با قابلیت برداشت به شماره شبا</span>
        </div>
      </div>
    </div>
  );
}
