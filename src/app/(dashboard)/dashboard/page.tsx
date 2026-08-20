import Link from 'next/link';
import type { Metadata } from 'next';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  ArrowLeftRight,
  Wallet,
  Package,
  Plus,
  Minus,
} from 'lucide-react';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { formatNumber, formatToman, toPersianDigits } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'داشبورد',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const cashWallet = await db.cashWallet.findUnique({ where: { userId: user.id } });
  const goldWallet = await db.goldWallet.findUnique({ where: { userId: user.id } });
  const snapshot = await getLatestPriceSnapshot('18K');

  const cashBalanceRial = cashWallet?.balanceRial || BigInt(0);
  const goldBalanceNg = goldWallet?.balanceNg || BigInt(0);
  
  const goldGrams = Number(goldBalanceNg) / 1_000_000_000;
  const goldValueToman = Number((goldBalanceNg * snapshot.buyPriceRial) / BigInt(10_000_000_000));
  const cashBalanceToman = Number(cashBalanceRial / BigInt(10));
  
  // Placeholder values for metrics that require history
  const isProfit = true;
  const profitToman = 0;
  const profitPct = 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">داشبورد</h1>
        <p className="text-sm text-text-secondary mt-1">خلاصه وضعیت حساب شما</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card-surface p-5">
          <p className="text-xs text-text-muted mb-1">موجودی طلا</p>
          <p className="text-xl font-bold font-num text-text-primary">
            {toPersianDigits(goldGrams.toFixed(4))}
            <span className="text-sm font-normal text-text-muted mr-1">گرم</span>
          </p>
        </div>
        <div className="card-surface p-5">
          <p className="text-xs text-text-muted mb-1">ارزش فعلی</p>
          <p className="text-xl font-bold font-num text-text-primary">
            {formatNumber(goldValueToman)}
            <span className="text-sm font-normal text-text-muted mr-1">تومان</span>
          </p>
        </div>
        <div className="card-surface p-5">
          <p className="text-xs text-text-muted mb-1">سود/زیان</p>
          <div className={`flex items-center gap-1 ${isProfit ? 'text-success' : 'text-danger'}`}>
            {isProfit ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <p className="text-xl font-bold font-num">
              {isProfit ? '+' : ''}{formatNumber(profitToman)}
            </p>
          </div>
          <p className={`text-xs font-num mt-0.5 ${isProfit ? 'text-success' : 'text-danger'}`}>
            ({isProfit ? '+' : ''}{toPersianDigits(profitPct.toFixed(2))}٪)
          </p>
        </div>
        <div className="card-surface p-5">
          <p className="text-xs text-text-muted mb-1">موجودی نقدی</p>
          <p className="text-xl font-bold font-num text-text-primary">
            {formatNumber(cashBalanceToman)}
            <span className="text-sm font-normal text-text-muted mr-1">تومان</span>
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-surface p-5">
        <h2 className="text-sm font-semibold text-text-primary mb-4">عملیات سریع</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { icon: ShoppingCart, label: 'خرید طلا', href: '/buy', color: 'bg-success-light text-success' },
            { icon: Minus, label: 'فروش طلا', href: '/sell', color: 'bg-danger-light text-danger' },
            { icon: Plus, label: 'واریز', href: '/wallet', color: 'bg-info-light text-info' },
            { icon: Wallet, label: 'برداشت', href: '/wallet', color: 'bg-warning-light text-warning' },
            { icon: ArrowLeftRight, label: 'انتقال', href: '/transfer', color: 'bg-gold-100 text-gold-700' },
            { icon: Package, label: 'تحویل', href: '/delivery', color: 'bg-surface-secondary text-text-secondary' },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-surface-hover transition-colors"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${action.color}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-text-primary">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Portfolio Details & Chart */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card-surface p-5">
          <h2 className="text-sm font-semibold text-text-primary mb-4">جزئیات پرتفوی</h2>
          <div className="space-y-3">
            {[
              { label: 'ارزش کل دارایی‌ها (نقدی + طلا)', value: formatToman(cashBalanceToman + goldValueToman) },
              { label: 'قیمت فعلی خرید زروی', value: formatToman(Number(snapshot.buyPriceRial / BigInt(10))) },
              { label: 'قیمت فعلی فروش به زروی', value: formatToman(Number(snapshot.sellPriceRial / BigInt(10))) },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{item.label}</span>
                <span className="text-sm font-medium font-num text-text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-5">
          <h2 className="text-sm font-semibold text-text-primary mb-4">نمودار ارزش پرتفوی</h2>
          <div className="flex items-center justify-center h-48 bg-surface-secondary rounded-lg">
            <p className="text-sm text-text-muted">نمودار به‌زودی اضافه می‌شود</p>
          </div>
          <div className="flex gap-1 mt-3">
            {['۱ر', '۱ه', '۱م', '۳م', '۶م', '۱س', 'همه'].map((period) => (
              <Button
                key={period}
                variant="ghost"
                size="sm"
                className="flex-1 text-xs px-1 h-8"
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
