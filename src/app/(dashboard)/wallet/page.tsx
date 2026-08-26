'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { depositAction } from '../actions';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WalletPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.append('idempotencyKey', window.crypto.randomUUID());
      formData.append('amount', amount);
      
      const result = await depositAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'خطایی رخ داد');
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pt-4 pb-16">
      <div>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="diamond-motif !w-2 !h-2" />
          <span className="text-xs tracking-brand font-semibold text-[#7E776C] uppercase">امور مالی و کیف پول</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#161412] tracking-tight">افزایش موجودی نقدی (ریالی)</h1>
        <p className="text-xs sm:text-sm text-[#4A453E] mt-1 font-light">
          واریز آنلاین از کلیه کارت‌های بانکی عضو شتاب با درگاه امن شاپرک
        </p>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E8E2D7] shadow-subtle">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3.5 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 rounded-2xl text-center">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="deposit-amount" className="block text-xs font-bold text-[#161412] mb-1.5">
              مبلغ واریز مورد نظر (تومان)
            </label>
            <div className="relative">
              <input
                id="deposit-amount"
                type="text"
                dir="ltr"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="1,000,000"
                className="w-full rounded-2xl border border-[#E8E2D7] bg-[#FAF8F4] px-4 py-3.5 text-base sm:text-lg font-num text-left placeholder:text-[#7E776C] focus:border-[#B35817] focus:bg-white outline-none transition-all"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7E776C]">
                تومان
              </span>
            </div>
          </div>

          <div className="bg-[#FAF8F4] p-4 rounded-2xl border border-[#E8E2D7] space-y-1.5 text-xs text-[#4A453E]">
            <div className="flex items-center gap-2 text-[#14182E] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#B35817]" />
              <span>پروتکل امن پرداخت شاپرک ۲</span>
            </div>
            <p className="text-[11px] text-[#7E776C] leading-relaxed font-light">
              واریزهای انجام‌شده بلافاصله پس از بازگشت از درگاه در کیف پول شما منظور شده و آماده خرید لحظه‌ای طلا خواهد بود.
            </p>
          </div>

          <Button
            type="submit"
            disabled={!amount}
            isLoading={isPending}
            variant="primary"
            className="w-full py-4 rounded-full text-xs font-bold shadow-copper-glow flex items-center justify-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            <span>انتقال به درگاه امن بانکی</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
