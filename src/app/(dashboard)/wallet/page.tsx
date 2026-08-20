'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { depositAction } from '../actions';
import { Plus } from 'lucide-react';
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
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">کیف پول نقدی</h1>
        <p className="text-sm text-text-secondary mt-1">افزایش موجودی برای خرید طلا</p>
      </div>

      <div className="card-surface p-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 text-sm text-danger bg-danger-light rounded-lg text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              مبلغ واریز (تومان)
            </label>
            <div className="relative">
              <input
                type="text"
                dir="ltr"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="1,000,000"
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-lg font-num text-left placeholder:text-text-muted focus:border-info focus:ring-1 focus:ring-info outline-none transition-colors"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                تومان
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!amount}
            isLoading={isPending}
            variant="primary"
            className="w-full bg-info hover:bg-info/90 border-info"
            icon={<Plus className="h-4 w-4" />}
          >
            هدایت به درگاه پرداخت
          </Button>
        </form>
      </div>
    </div>
  );
}
