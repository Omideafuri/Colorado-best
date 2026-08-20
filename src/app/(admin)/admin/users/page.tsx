import { Users } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">مدیریت کاربران</h1>
      </div>
      <div className="card-surface p-8 text-center text-text-secondary">
        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>لیست و مدیریت کاربران به زودی پیاده‌سازی خواهد شد.</p>
      </div>
    </div>
  );
}