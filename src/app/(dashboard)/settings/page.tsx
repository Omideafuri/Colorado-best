import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">تنظیمات حساب کاربری</h1>
      </div>
      <div className="card-surface p-8 text-center text-text-secondary">
        <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>تنظیمات امنیتی، رمز عبور و اعلانات به زودی به این بخش اضافه خواهد شد.</p>
      </div>
    </div>
  );
}