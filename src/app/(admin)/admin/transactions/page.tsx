import { ArrowLeftRight } from 'lucide-react';

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">تراکنش‌های سیستم</h1>
      </div>
      <div className="card-surface p-8 text-center text-text-secondary">
        <ArrowLeftRight className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>مشاهده جامع تراکنش‌های خرید و فروش به زودی.</p>
      </div>
    </div>
  );
}