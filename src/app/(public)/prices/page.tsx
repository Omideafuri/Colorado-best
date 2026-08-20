import { Shield, TrendingUp } from 'lucide-react';

export default function PricesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-text-primary mb-4">قیمت لحظه‌ای طلا</h1>
        <p className="text-text-secondary">مشاهده و تحلیل قیمت‌های آنلاین طلا در پلتفرم زروی.</p>
      </div>
      <div className="card-surface p-8 max-w-2xl mx-auto text-center">
        <TrendingUp className="h-12 w-12 text-gold-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">در حال بارگذاری داده‌های بازار...</h2>
        <p className="text-text-secondary">این بخش به زودی با نمودارهای تعاملی به‌روز خواهد شد.</p>
      </div>
    </div>
  );
}