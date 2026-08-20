'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { buyGoldAction } from '../actions';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BuyGoldPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  const [mode, setMode] = useState<'BY_AMOUNT' | 'BY_WEIGHT'>('BY_AMOUNT');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue || isNaN(Number(inputValue))) return;

    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.append('mode', mode);
      formData.append('value', mode === 'BY_AMOUNT' ? String(Number(inputValue) * 10) : String(Number(inputValue) * 1000000000));
      formData.append('idempotencyKey', window.crypto.randomUUID());
      
      const result = await buyGoldAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'خطایی رخ داد');
      }
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">خرید طلا</h1>
        <p className="text-sm text-text-secondary mt-1">خرید آنی طلای ۱۸ عیار</p>
      </div>

      <div className="card-surface p-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 text-sm text-danger bg-danger-light rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Mode Selector */}
          <div className="flex p-1 bg-surface-secondary rounded-lg gap-1">
            <Button
              type="button"
              variant={mode === 'BY_AMOUNT' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => { setMode('BY_AMOUNT'); setInputValue(''); }}
              className="flex-1"
            >
              مبلغی
            </Button>
            <Button
              type="button"
              variant={mode === 'BY_WEIGHT' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => { setMode('BY_WEIGHT'); setInputValue(''); }}
              className="flex-1"
            >
              وزنی
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              {mode === 'BY_AMOUNT' ? 'مبلغ خرید (تومان)' : 'وزن طلا (گرم)'}
            </label>
            <div className="relative">
              <input
                type="text"
                dir="ltr"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder={mode === 'BY_AMOUNT' ? '1,000,000' : '1.5'}
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-lg font-num text-left placeholder:text-text-muted focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                {mode === 'BY_AMOUNT' ? 'تومان' : 'گرم'}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!inputValue}
            isLoading={isPending}
            icon={<ShoppingCart className="h-4 w-4" />}
            className="w-full"
          >
            تأیید و خرید
          </Button>
        </form>
      </div>
    </div>
  );
}
