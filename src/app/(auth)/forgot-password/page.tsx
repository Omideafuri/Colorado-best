import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary">بازیابی رمز عبور</h2>
        <p className="mt-2 text-sm text-text-secondary">شماره موبایل خود را برای دریافت کد تایید وارد کنید</p>
      </div>
      <form className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">شماره موبایل</label>
          <input type="text" dir="ltr" placeholder="09123456789" className="w-full rounded-lg border border-border bg-surface px-4 py-2" />
        </div>
        <Button variant="primary" className="w-full">ارسال کد بازیابی</Button>
      </form>
      <div className="text-center mt-4">
        <Link href="/login" className="text-sm font-medium text-gold-600 hover:text-gold-700">بازگشت به ورود</Link>
      </div>
    </div>
  );
}