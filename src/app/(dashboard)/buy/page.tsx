'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { executeBuyOrderAction } from '../actions';
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
      formData.append('goldType', '18K');
      formData.append('inputMode', inputMode);
      if (inputMode === 'BY_AMOUNT') {
        formData.append('amountToman', amountToman);
      } else {
        formData.append('weightGrams', weightGrams);
      }

      const result = await executeBuyOrderAction(formData);
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
          <span className="text-xs tracking-brand font-semibold text-[#7E776C] uppercase">میز معاملات طلای ۱۸ عیار</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#161412] tracking-tight">خرید آنلاین طلای دیجیتال</h1>
        <p className="text-xs sm:text-sm text-[#4A453E] mt-1 font-light">
          خرید لحظه‌ای با پشتوانه فیزیکی و ثبت آنی در خزانه با گواهی رسمی
        </p>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E8E2D7] shadow-subtle space-y-6">
        {/* Live Price Header */}
        <div className="flex items-center justify-between p-4 bg-[#FAF8F4] rounded-2xl border border-[#E8E2D7]">
          <div>
            <span className="text-[10px] text-[#7E776C] block mb-0.5 font-semibold uppercase">نرخ هر گرم طلای ۱۸ عیار</span>
            <span className="text-base sm:text-lg font-bold font-num text-[#14182E]">
              {toPersianDigits(formatNumber(buyPriceToman))} تومان
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#7E776C]">
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingPrice ? 'animate-spin text-[#B35817]' : ''}`} />
            <span className="font-num text-[11px]">زنده</span>
          </div>
        </div>

        {/* Input Mode Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-[#F3EFE6] p-1 rounded-2xl border border-[#E8E2D7]">
          <button
            type="button"
            onClick={() => setInputMode('BY_AMOUNT')}
            className={`py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              inputMode === 'BY_AMOUNT'
                ? 'bg-white text-[#14182E] shadow-subtle border border-[#E8E2D7]'
                : 'text-[#7E776C] hover:text-[#161412]'
            }`}
          >
            خرید بر اساس مبلغ (تومان)
          </button>
          <button
            type="button"
            onClick={() => setInputMode('BY_WEIGHT')}
            className={`py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              inputMode === 'BY_WEIGHT'
                ? 'bg-white text-[#14182E] shadow-subtle border border-[#E8E2D7]'
                : 'text-[#7E776C] hover:text-[#161412]'
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
              <label className="block text-xs font-bold text-[#161412] mb-1.5">مبلغ خرید (تومان)</label>
              <div className="relative">
                <input
                  type="text"
                  dir="ltr"
                  value={amountToman}
                  onChange={(e) => setAmountToman(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="1,000,000"
                  className="w-full rounded-2xl border border-[#E8E2D7] bg-[#FAF8F4] px-4 py-3.5 text-base sm:text-lg font-num text-left placeholder:text-[#7E776C] focus:border-[#B35817] focus:bg-white outline-none transition-all"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7E776C]">
                  تومان
                </span>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-[#161412] mb-1.5">وزن طلا (گرم)</label>
              <div className="relative">
                <input
                  type="text"
                  dir="ltr"
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(e.target.value)}
                  placeholder="1.000"
                  className="w-full rounded-2xl border border-[#E8E2D7] bg-[#FAF8F4] px-4 py-3.5 text-base sm:text-lg font-num text-left placeholder:text-[#7E776C] focus:border-[#B35817] focus:bg-white outline-none transition-all"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7E776C]">
                  گرم
                </span>
              </div>
            </div>
          )}

          {/* Computed Summary Pod */}
          <div className="p-4 bg-[#FAF8F4] rounded-2xl border border-[#E8E2D7] space-y-2 text-xs">
            <div className="flex justify-between items-center text-[#4A453E]">
              <span>معادل وزن طلا:</span>
              <span className="font-num font-bold text-sm text-[#14182E]">{toPersianDigits(computedWeight)} گرم</span>
            </div>
            <div className="flex justify-between items-center text-[#4A453E]">
              <span>مبلغ کل پرداختی:</span>
              <span className="font-num font-bold text-sm text-[#B35817]">{toPersianDigits(formatNumber(computedAmount))} تومان</span>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isPending}
            variant="primary"
            className="w-full py-4 rounded-full text-xs font-bold shadow-copper-glow flex items-center justify-center gap-2"
          >
            <span>تأیید و خرید قطعی طلا</span>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </form>

        <div className="flex items-center gap-2 text-xs text-[#7E776C] justify-center pt-2">
          <ShieldCheck className="w-4 h-4 text-[#B35817]" />
          <span>پشتوانه ۱۰۰٪ شمش در خزانه امن بانکی زروی</span>
        </div>
      </div>
    </div>
  );
}
