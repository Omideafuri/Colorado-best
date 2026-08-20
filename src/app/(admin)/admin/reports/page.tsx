import { BarChart3 } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">گزارشات آماری</h1>
      </div>
      <div className="card-surface p-8 text-center text-text-secondary">
        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>داشبورد گزارشات مالی و نمودارهای تحلیلی پلتفرم.</p>
      </div>
    </div>
  );
}