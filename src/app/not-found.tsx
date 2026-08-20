import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-secondary px-4">
      <div className="text-center">
        <p className="text-6xl font-bold font-num text-gold-500 mb-4">۴۰۴</p>
        <h1 className="text-xl font-bold text-text-primary mb-2">
          صفحه مورد نظر یافت نشد
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
        >
          <Home className="h-4 w-4" />
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}
