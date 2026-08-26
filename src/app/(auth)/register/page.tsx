'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerAction } from '../actions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Smartphone, Lock } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await registerAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'خطایی در ایجاد حساب رخ داد');
      }
    });
  };

  return (
    <div className="min-h-screen bg-v2-lapis text-white flex flex-col justify-center items-center px-4 py-12 selection:bg-[#B35817]">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <span className="diamond-motif !w-2.5 !h-2.5 group-hover:rotate-90 transition-transform duration-500 shadow-copper-glow" />
            <span className="text-2xl tracking-brand font-bold text-white group-hover:text-[#EBD8C1] transition-colors">
              ZARAVI
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">افتتاح حساب در زروی</h1>
          <p className="text-xs sm:text-sm text-[#C7C0B3] font-light">
            خرید و نگهداری طلای دیجیتال با ضمانت شمش بانکی
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#14182E] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 text-xs font-semibold text-rose-300 bg-rose-950/60 border border-rose-800 rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#EBD8C1] mb-1.5">نام</label>
                <div className="relative">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="آرش"
                    className="w-full rounded-xl border border-white/15 bg-[#0C0E1A] px-3.5 py-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-[#B35817] outline-none"
                    required
                  />
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#EBD8C1] mb-1.5">نام خانوادگی</label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="امینی"
                  className="w-full rounded-xl border border-white/15 bg-[#0C0E1A] px-3.5 py-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-[#B35817] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#EBD8C1] mb-1.5">شماره تلفن همراه</label>
              <div className="relative">
                <input
                  name="mobile"
                  type="text"
                  dir="ltr"
                  placeholder="09123456789"
                  className="w-full rounded-xl border border-white/15 bg-[#0C0E1A] px-4 py-3 text-xs sm:text-sm font-num text-left text-white placeholder:text-white/30 focus:border-[#B35817] outline-none"
                  required
                />
                <Smartphone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#EBD8C1] mb-1.5">رمز عبور (حداقل ۸ کاراکتر)</label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  dir="ltr"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/15 bg-[#0C0E1A] px-4 py-3 text-xs sm:text-sm font-mono text-left text-white placeholder:text-white/30 focus:border-[#B35817] outline-none"
                  required
                />
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#EBD8C1] mb-1.5">تکرار رمز عبور</label>
              <input
                name="confirmPassword"
                type="password"
                dir="ltr"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/15 bg-[#0C0E1A] px-4 py-3 text-xs sm:text-sm font-mono text-left text-white placeholder:text-white/30 focus:border-[#B35817] outline-none"
                required
              />
            </div>

            <Button
              type="submit"
              isLoading={isPending}
              variant="primary"
              className="w-full py-3.5 rounded-full text-xs font-bold shadow-copper-glow flex items-center justify-center gap-2 mt-2"
            >
              <span>افتتاح حساب و ورود به پنل</span>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-[#C7C0B3]">
            <span>قبلاً حساب کاربری ساخته‌اید؟</span>{' '}
            <Link href="/login" className="font-bold text-[#EBD8C1] hover:text-white hover:underline">
              ورود اعضا
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
