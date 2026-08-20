'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { registerAction } from '../actions';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await registerAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'خطایی در ثبت‌نام رخ داد');
      }
    });
  }

  return (
    <>
      <div className="text-center mb-8">
        <span className="text-xs tracking-brand text-text-muted block mb-2">عضویت در خانه زروی</span>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">افتتاح حساب کاربری</h1>
      </div>

      <form action={onSubmit} className="space-y-4">
        {error && (
          <div className="p-3.5 text-xs text-danger bg-danger-light border border-danger/20 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs tracking-brand text-text-muted mb-1.5">نام</label>
            <input
              type="text"
              name="firstName"
              required
              placeholder="نام"
              className="w-full border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-muted focus:border-text-primary outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs tracking-brand text-text-muted mb-1.5">نام خانوادگی</label>
            <input
              type="text"
              name="lastName"
              required
              placeholder="نام خانوادگی"
              className="w-full border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-muted focus:border-text-primary outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs tracking-brand text-text-muted mb-1.5">شماره موبایل</label>
          <input
            type="tel"
            name="mobile"
            dir="ltr"
            required
            placeholder="09123456789"
            className="w-full border border-border bg-surface px-4 py-3 text-sm font-num placeholder:text-text-muted focus:border-text-primary outline-none transition-colors"
            maxLength={11}
          />
        </div>

        <div>
          <label className="block text-xs tracking-brand text-text-muted mb-1.5">رمز عبور</label>
          <input
            type="password"
            name="password"
            dir="ltr"
            required
            placeholder="حداقل ۸ کاراکتر"
            className="w-full border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-muted focus:border-text-primary outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs tracking-brand text-text-muted mb-1.5">تکرار رمز عبور</label>
          <input
            type="password"
            name="confirmPassword"
            dir="ltr"
            required
            placeholder="تکرار رمز عبور"
            className="w-full border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-muted focus:border-text-primary outline-none transition-colors"
          />
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer pt-2">
          <input type="checkbox" required className="mt-1 h-4 w-4 border-border text-surface-dark focus:ring-0 accent-[#141210]" />
          <span className="text-xs text-text-secondary leading-relaxed">
            <Link href="/terms" className="underline hover:text-text-primary">قوانین و مقررات</Link>
            {' '}و{' '}
            <Link href="/privacy" className="underline hover:text-text-primary">حریم خصوصی</Link>
            {' '}خانه زروی را می‌پذیرم.
          </span>
        </label>

        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isPending}
            className="w-full"
            size="lg"
          >
            تکمیل ثبت‌نام
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-xs text-text-secondary border-t border-border pt-6">
        قبلاً حساب باز کرده‌اید؟{' '}
        <Link href="/login" className="font-semibold text-text-primary hover:text-gold-600 transition-colors">
          ورود به حساب
        </Link>
      </p>
    </>
  );
}
