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
        setError(result.error || 'اطلاعات ورود نامعتبر است');
      }
    });
  }

  return (
    <>
      <div className="text-center mb-8">
        <span className="text-xs tracking-brand text-text-muted block mb-2">خوش‌آمدید</span>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">ورود به حساب کاربری</h1>
      </div>

      <form action={onSubmit} className="space-y-5">
        {error && (
          <div className="p-3.5 text-xs text-danger bg-danger-light border border-danger/20 text-center">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs tracking-brand text-text-muted mb-2">
            شماره موبایل
          </label>
          <input
            type="tel"
            name="mobile"
            dir="ltr"
            placeholder="09123456789"
            required
            className="w-full border border-border bg-surface px-4 py-3 text-sm font-num placeholder:text-text-muted focus:border-text-primary outline-none transition-colors"
            maxLength={11}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs tracking-brand text-text-muted">
              رمز عبور
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              فراموشی رمز عبور
            </Link>
          </div>
          <input
            type="password"
            name="password"
            dir="ltr"
            required
            placeholder="••••••••"
            className="w-full border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-muted focus:border-text-primary outline-none transition-colors"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isPending}
            className="w-full"
            size="lg"
          >
            ورود به حساب
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-xs text-text-secondary border-t border-border pt-6">
        حساب کاربری ندارید؟{' '}
        <Link href="/register" className="font-semibold text-text-primary hover:text-gold-600 transition-colors">
          ثبت‌نام و افتتاح حساب
        </Link>
      </p>
    </>
  );
}
