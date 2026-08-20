'use client';

import { useState, useTransition, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyOtpAction, sendOtpAction } from '../actions';
import { Button } from '@/components/ui/button';

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile') || '';
  const purpose = (searchParams.get('purpose') || 'VERIFY') as 'LOGIN' | 'REGISTER' | 'VERIFY' | 'RESET';
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    if (!mobile) {
      router.push('/login');
    }
  }, [mobile, router]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setError(null);
    const result = await sendOtpAction(mobile, purpose);
    if (result.success) {
      setTimer(120);
    } else {
      setError(result.error || 'خطا در ارسال مجدد کد');
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) return;

    setError(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.append('mobile', mobile);
      formData.append('code', fullCode);
      formData.append('purpose', purpose);
      
      const result = await verifyOtpAction(formData);
      if (result.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(result.error || 'کد وارد شده نامعتبر است');
      }
    });
  };

  const formattedTimer = `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`;
  const maskedMobile = mobile ? `${mobile.slice(0, 4)}***${mobile.slice(-4)}` : '';

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold text-text-primary">تایید شماره موبایل</h1>
        <p className="mt-2 text-sm text-text-secondary">
          کد ۶ رقمی ارسال شده به شماره موبایل خود را وارد کنید
        </p>
        <p className="mt-1 text-sm font-num text-gold-600" dir="ltr">
          {maskedMobile}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-danger bg-danger-light rounded-lg text-center">
            {error}
          </div>
        )}

        {/* OTP Input */}
        <div className="flex justify-center gap-2" dir="ltr">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 rounded-lg border border-border bg-surface text-center text-lg font-num font-bold placeholder:text-text-muted focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
            />
          ))}
        </div>

        {/* Timer & Resend */}
        <div className="text-center text-sm">
          {timer > 0 ? (
            <p className="text-text-secondary">
              ارسال مجدد کد تا {' '}
              <span className="font-num text-gold-600 font-medium">{formattedTimer}</span>
              {' '}دیگر
            </p>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleResend}
            >
              ارسال مجدد کد
            </Button>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={code.join('').length < 6}
          isLoading={isPending}
          className="w-full"
        >
          تایید
        </Button>
      </form>
    </>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-center">در حال بارگذاری...</div>}>
      <VerifyForm />
    </Suspense>
  );
}
