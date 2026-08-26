'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { buyGoldAction } from '../actions';
import { Button } from '@/components/ui/button';
import { formatNumber, toPersianDigits } from '@/lib/utils/format';
import { ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react';

export default function BuyPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [inputMode, setInputMode] = useState<'BY_AMOUNT' | 'BY_WEIGHT'>('BY_AMOUNT');
  const [amountToman, setAmountToman] = useState('1000000');
  const [weightGrams, setWeightGrams] = useState('0.25');

  const [priceData, setPriceData] = useState<{ buyPriceToman: number } | null>(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);

  useEffect(() => {
    async function fetchPrice() {
      try {
        setIsLoadingPrice(true);
        const res = await fetch('/api/prices');
        if (res.ok) {
          const data = await res.json();
          setPriceData({
            buyPriceToman: Math.floor(Number(data.buyPriceRial) / 10),
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

  const buyPriceToman = priceData?.buyPriceToman || 3500000;

  const computedWeight = inputMode === 'BY_AMOUNT' 
    ? (Number(amountToman) > 0 ? (Number(amountToman) / buyPriceToman).toFixed(4) : '0')
    : weightGrams;

  const computedAmount = inputMode === 'BY_WEIGHT'
    ? (Number(weightGrams) > 0 ? Math.floor(Number(weightGrams) * buyPriceToman) : 0)
    : Number(amountToman);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append('idempotencyKey', window.crypto.randomUUID());
      formData.append('mode', inputMode);
      if (inputMode === 'BY_AMOUNT') {
        formData.append('value', (BigInt(amountToman) * BigInt(10)).toString());
      } else {
        const ng = BigInt(Math.floor(Number(weightGrams) * 1_000_000_000));
        formData.append('value', ng.toString());
      }

      const result = await buyGoldAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'خطایی در ثبت سفارش رخ داد');
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
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2A1A08] tracking-tight">خرید آنلاین طلای دیجیتال</h1>
        <p className="text-xs sm:text-sm text-[#57442D] mt-1 font-light">
          خرید لحظه‌ای با پشتوانه فیزیکی و ثبت آنی در خزانه با گواهی رسمی
        </p>
      </div>

      <div className="floating-card p-6 sm:p-8 space-y-6">
        {/* Live Price Header */}
        <div className="flex items-center justify-between p-4 bg-[#FAF8EE] rounded-2xl border border-[#DFD7B5]">
          <div>
            <span className="text-[10px] text-[#8C775D] block mb-0.5 font-semibold uppercase">نرخ هر گرم طلای ۱۸ عیار</span>
            <span className="text-base sm:text-lg font-bold font-num text-[#3A230A]">
              {toPersianDigits(formatNumber(buyPriceToman))} تومان
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#8C775D]">
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingPrice ? 'animate-spin text-[#A4530C]' : ''}`} />
            <span className="font-num text-[11px]">زنده</span>
          </div>
        </div>

        {/* Input Mode Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-[#EEE9C1]/60 p-1 rounded-2xl border border-[#DFD7B5]">
          <button
            type="button"
            onClick={() => setInputMode('BY_AMOUNT')}
            className={`py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              inputMode === 'BY_AMOUNT'
                ? 'bg-white text-[#2A1A08] shadow-floating-sm border border-[#DFD7B5]'
                : 'text-[#8C775D] hover:text-[#2A1A08]'
            }`}
          >
            خرید بر اساس مبلغ (تومان)
          </button>
          <button
            type="button"
            onClick={() => setInputMode('BY_WEIGHT')}
            className={`py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              inputMode === 'BY_WEIGHT'
                ? 'bg-white text-[#2A1A08] shadow-floating-sm border border-[#DFD7B5]'
                : 'text-[#8C775D] hover:text-[#2A1A08]'
            }`}
          >
            خرید بر اساس وزن (گرم)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3.5 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 rounded-2xl text-center">
              {error}
            </div>
          )}

          {inputMode === 'BY_AMOUNT' ? (
            <div>
              <label className="block text-xs font-bold text-[#2A1A08] mb-1.5">مبلغ خرید (تومان)</label>
              <div className="relative">
                <input
                  type="text"
                  dir="ltr"
                  value={amountToman}
                  onChange={(e) => setAmountToman(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="1,000,000"
                  className="w-full rounded-2xl border border-[#DFD7B5] bg-[#FAF8EE] px-4 py-3.5 text-base sm:text-lg font-num text-left placeholder:text-[#8C775D] focus:border-[#A4530C] focus:bg-white outline-none transition-all"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C775D]">
                  تومان
                </span>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-[#2A1A08] mb-1.5">وزن طلا (گرم)</label>
              <div className="relative">
                <input
                  type="text"
                  dir="ltr"
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(e.target.value)}
                  placeholder="1.000"
                  className="w-full rounded-2xl border border-[#DFD7B5] bg-[#FAF8EE] px-4 py-3.5 text-base sm:text-lg font-num text-left placeholder:text-[#8C775D] focus:border-[#A4530C] focus:bg-white outline-none transition-all"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C775D]">
                  گرم
                </span>
              </div>
            </div>
          )}

          {/* Computed Summary Pod */}
          <div className="p-4 bg-[#FAF8EE] rounded-2xl border border-[#DFD7B5] space-y-2 text-xs">
            <div className="flex justify-between items-center text-[#57442D]">
              <span>معادل وزن طلا:</span>
              <span className="font-num font-bold text-sm text-[#3A230A]">{toPersianDigits(computedWeight)} گرم</span>
            </div>
            <div className="flex justify-between items-center text-[#57442D]">
              <span>مبلغ کل پرداختی:</span>
              <span className="font-num font-bold text-sm text-[#A4530C]">{toPersianDigits(formatNumber(computedAmount))} تومان</span>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isPending}
            variant="primary"
            className="w-full py-4 rounded-full text-xs font-bold flex items-center justify-center gap-2"
          >
            <span>تأیید و خرید قطعی طلا</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </form>

        <div className="flex items-center gap-2 text-xs text-[#8C775D] justify-center pt-2">
          <ShieldCheck className="w-4 h-4 text-[#A4530C]" />
          <span>پشتوانه ۱۰۰٪ شمش در خزانه امن بانکی زروی</span>
        </div>
      </div>
    </div>
  );
}
