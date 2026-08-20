'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { loginAction } from '../actions';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'خطایی رخ داد');
      }
    });
  }

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-text-primary">ورود به حساب</h1>
        <p className="mt-2 text-sm text-text-secondary">به زروی خوش آمدید</p>
      </div>

      <form action={onSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-danger bg-danger-light rounded-lg text-center">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            شماره موبایل
          </label>
          <input
            type="tel"
            name="mobile"
            dir="ltr"
            placeholder="09123456789"
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm font-num placeholder:text-text-muted focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
            maxLength={11}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-text-primary">
              رمز عبور
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-gold-600 hover:text-gold-700"
            >
              فراموشی رمز عبور
            </Link>
          </div>
          <input
            type="password"
            name="password"
            dir="ltr"
            required
            placeholder="رمز عبور خود را وارد کنید"
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-muted focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
          />
        </div>

        <Button
          type="submit"
          isLoading={isPending}
          className="w-full"
        >
          ورود
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        حساب ندارید؟{' '}
        <Link href="/register" className="font-medium text-gold-600 hover:text-gold-700">
          ثبت‌نام
        </Link>
      </p>
    </>
  );
}
