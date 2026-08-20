import { FileText } from 'lucide-react';

export default function AdminAuditPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">لاگ‌های امنیتی</h1>
      </div>
      <div className="card-surface p-8 text-center text-text-secondary">
        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>بخش مشاهده لاگ‌های حسابرسی و عملیات مدیران.</p>
      </div>
    </div>
  );
}