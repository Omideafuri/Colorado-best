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
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-text-primary">ساخت حساب جدید</h1>
        <p className="mt-2 text-sm text-text-secondary">
          برای شروع سرمایه‌گذاری ثبت‌نام کنید
        </p>
      </div>

      <form action={onSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-danger bg-danger-light rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">نام</label>
            <input
              type="text"
              name="firstName"
              required
              placeholder="نام"
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-muted focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">نام خانوادگی</label>
            <input
              type="text"
              name="lastName"
              required
              placeholder="نام خانوادگی"
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-muted focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">شماره موبایل</label>
          <input
            type="tel"
            name="mobile"
            dir="ltr"
            required
            placeholder="09123456789"
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm font-num placeholder:text-text-muted focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
            maxLength={11}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">رمز عبور</label>
          <input
            type="password"
            name="password"
            dir="ltr"
            required
            placeholder="حداقل ۸ کاراکتر"
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-muted focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">تکرار رمز عبور</label>
          <input
            type="password"
            name="confirmPassword"
            dir="ltr"
            required
            placeholder="تکرار رمز عبور"
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm placeholder:text-text-muted focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
          />
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-border text-gold-500 focus:ring-gold-500" />
          <span className="text-xs text-text-secondary leading-relaxed">
            <Link href="/terms" className="text-gold-600 hover:text-gold-700">قوانین و مقررات</Link>
            {' '}و{' '}
            <Link href="/privacy" className="text-gold-600 hover:text-gold-700">حریم خصوصی</Link>
            {' '}را مطالعه کرده و می‌پذیرم.
          </span>
        </label>

        <Button
          type="submit"
          isLoading={isPending}
          className="w-full"
        >
          ثبت‌نام
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        قبلاً ثبت‌نام کرده‌اید؟{' '}
        <Link href="/login" className="font-medium text-gold-600 hover:text-gold-700">ورود</Link>
      </p>
    </>
  );
}
