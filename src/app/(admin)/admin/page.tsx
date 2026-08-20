import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { formatNumber, toPersianDigits } from '@/lib/utils/format';
import { Users, TrendingUp, Wallet, ShieldAlert } from 'lucide-react';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
    redirect('/dashboard');
  }

  // Fetch basic platform metrics
  const totalUsers = await db.user.count();
  
  // Aggregate total gold held by users
  const goldWallets = await db.goldWallet.aggregate({
    _sum: { balanceNg: true }
  });
  
  const totalGoldNg = goldWallets._sum.balanceNg || 0n;
  const totalGoldGrams = Number(totalGoldNg) / 1_000_000_000;

  // Aggregate total cash held by users
  const cashWallets = await db.cashWallet.aggregate({
    _sum: { balanceRial: true }
  });
  
  const totalCashRial = cashWallets._sum.balanceRial || 0n;
  const totalCashToman = Number(totalCashRial / 10n);

  // Pending KYC applications
  const pendingKyc = await db.kycApplication.count({
    where: { status: 'PENDING' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">داشبورد مدیریت</h1>
        <p className="text-sm text-text-secondary mt-1">نمای کلی از وضعیت پلتفرم زروی</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-surface p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-info-light text-info rounded-lg">
              <Users className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-text-secondary">تعداد کاربران</p>
          </div>
          <p className="text-2xl font-bold font-num text-text-primary">
            {formatNumber(totalUsers)}
          </p>
        </div>

        <div className="card-surface p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gold-100 text-gold-700 rounded-lg">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-text-secondary">کل طلای کاربران</p>
          </div>
          <p className="text-2xl font-bold font-num text-text-primary">
            {toPersianDigits(totalGoldGrams.toFixed(4))}
            <span className="text-sm font-normal text-text-muted mr-1">گرم</span>
          </p>
        </div>

        <div className="card-surface p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-success-light text-success rounded-lg">
              <Wallet className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-text-secondary">کل دارایی نقدی</p>
          </div>
          <p className="text-2xl font-bold font-num text-text-primary">
            {formatNumber(totalCashToman)}
            <span className="text-sm font-normal text-text-muted mr-1">تومان</span>
          </p>
        </div>

        <div className="card-surface p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-warning-light text-warning rounded-lg">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-text-secondary">احراز هویت‌های در انتظار</p>
          </div>
          <p className="text-2xl font-bold font-num text-text-primary">
            {formatNumber(pendingKyc)}
          </p>
        </div>
      </div>
    </div>
  );
}
