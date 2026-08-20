import { Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">تنظیمات پلتفرم</h1>
      </div>
      <div className="card-surface p-8 text-center text-text-secondary">
        <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>تنظیمات کلی سیستم، محدودیت‌ها و متغیرهای عملیاتی.</p>
      </div>
    </div>
  );
}