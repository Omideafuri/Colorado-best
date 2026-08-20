import { Button } from '@/components/ui/button';
import { ArrowLeftRight } from 'lucide-react';

export default function TransferPage() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">انتقال طلا</h1>
        <p className="text-sm text-text-secondary mt-1">انتقال طلای دیجیتال به حساب کاربران دیگر زروی</p>
      </div>
      <div className="card-surface p-6 text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 mx-auto text-gold-500">
          <ArrowLeftRight className="h-8 w-8" />
        </div>
        <h2 className="text-lg font-bold">این قابلیت به زودی فعال می‌شود</h2>
        <p className="text-sm text-text-secondary">تیم ما در حال توسعه زیرساخت‌های امن برای انتقال مستقیم طلا بین کاربران است.</p>
        <Button variant="outline" className="w-full" disabled>در حال توسعه</Button>
      </div>
    </div>
  );
}