'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginAction } from '../actions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock, Smartphone } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'شماره موبایل یا رمز عبور اشتباه است');
      }
    });
  };

  return (
    <div className="min-h-screen bg-monarch-umber text-white flex flex-col justify-center items-center px-4 py-12 selection:bg-[#A4530C]">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <span className="diamond-motif !w-2.5 !h-2.5 group-hover:rotate-90 transition-transform duration-500 shadow-floating-amber" />
            <span className="text-2xl tracking-brand font-bold text-white group-hover:text-[#EEE9C1] transition-colors">
              ZARAVI
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">ورود به پنل اعضا</h1>
          <p className="text-xs sm:text-sm text-[#DDD7B5] font-light">
            دسترسی به میز معاملات طلای دیجیتال و خزانه امن
          </p>
        </div>

        {/* Login Container Card */}
        <div className="bg-[#3A230A] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/15 shadow-floating-umber">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 text-xs font-semibold text-rose-300 bg-rose-950/60 border border-rose-800 rounded-xl text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#EEE9C1] mb-1.5">شماره تلفن همراه</label>
              <div className="relative">
                <input
                  name="mobile"
                  type="text"
                  dir="ltr"
                  placeholder="09123456789"
                  className="w-full rounded-xl border border-white/15 bg-[#231506] px-4 py-3 text-xs sm:text-sm font-num text-left text-white placeholder:text-white/30 focus:border-[#A4530C] outline-none"
                  required
                />
                <Smartphone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#EEE9C1]">رمز عبور</label>
                <Link href="/forgot-password" className="text-[11px] text-[#A4530C] hover:underline">
                  فراموشی رمز؟
                </Link>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  dir="ltr"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/15 bg-[#231506] px-4 py-3 text-xs sm:text-sm font-mono text-left text-white placeholder:text-white/30 focus:border-[#A4530C] outline-none"
                  required
                />
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isPending}
              variant="primary"
              className="w-full py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 mt-2"
            >
              <span>ورود به حساب کاربری</span>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-[#DDD7B5]">
            <span>حساب کاربری ندارید؟</span>{' '}
            <Link href="/register" className="font-bold text-[#EEE9C1] hover:text-white hover:underline">
              افتتاح حساب آنلاین
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
