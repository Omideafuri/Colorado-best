import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { calculateCashAmount } from '@/lib/financial/decimal';
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

  const cashBalanceRial = cashWallet?.balanceRial ?? 0n;
  const goldBalanceNg = goldWallet?.balanceNg ?? 0n;

  const goldGrams = Number(goldBalanceNg) / 1_000_000_000;
  const goldValueRial = calculateCashAmount(goldBalanceNg, snapshot.buyPriceRial);
  const goldValueToman = Number(goldValueRial / 10n);
  const cashBalanceToman = Number(cashBalanceRial / 10n);
  const totalPortfolioToman = goldValueToman + cashBalanceToman;

  const isProfit = true;
  const profitPct = 0;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">

      {/* Greeting */}
      <div className="pt-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="diamond-motif" />
          <span className="text-xs tracking-brand text-text-muted">پورتفوی شما</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-text-primary tracking-tight">
          صبح بخیر، {user.profile?.firstName || 'کاربر'} عزیز
        </h1>
      </div>

      {/* Portfolio Value — Clean, Editorial */}
      <div className="border border-border p-8 md:p-12 bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <p className="text-xs tracking-brand text-text-muted mb-4">مجموع دارایی‌ها</p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-5xl md:text-6xl font-semibold font-num text-text-primary tracking-tight">
                {formatNumber(totalPortfolioToman)}
              </h2>
              <span className="text-lg text-text-muted">تومان</span>
            </div>
            <div className={`mt-3 inline-flex items-center gap-1.5 text-sm font-medium font-num ${isProfit ? 'text-success' : 'text-danger'}`}>
              {isProfit ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              {isProfit ? '+' : ''}{toPersianDigits(profitPct.toFixed(2))}%
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/buy">
              <Button>خرید طلا</Button>
            </Link>
            <Link href="/sell">
              <Button variant="outline">فروش</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid md:grid-cols-2 gap-px bg-border">
        <div className="bg-surface-secondary p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="diamond-motif !bg-gold-500" />
            <span className="text-xs tracking-brand text-text-muted">موجودی طلا</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-semibold font-num text-text-primary tracking-tight">{toPersianDigits(goldGrams.toFixed(4))}</h3>
            <span className="text-text-muted">گرم</span>
          </div>
          <p className="text-sm text-text-secondary mt-2">
            ≈ {formatToman(goldValueToman)}
          </p>
        </div>

        <div className="bg-surface-secondary p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <Wallet className="h-4 w-4 text-text-muted" />
            <span className="text-xs tracking-brand text-text-muted">موجودی ریالی</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-semibold font-num text-text-primary tracking-tight">{formatNumber(cashBalanceToman)}</h3>
            <span className="text-text-muted">تومان</span>
          </div>
        </div>
      </div>

      {/* Quick Actions — Clean text links */}
      <div className="border border-border p-8 bg-surface">
        <h3 className="text-xs tracking-brand text-text-muted mb-8">عملیات</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border">
          {[
            { label: 'واریز وجه', href: '/wallet' },
            { label: 'برداشت', href: '/wallet' },
            { label: 'انتقال طلا', href: '/transfer' },
            { label: 'تحویل فیزیکی', href: '/delivery' },
            { label: 'فروشگاه', href: '/store' },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-surface-secondary p-6 text-center hover:bg-surface transition-colors duration-500 group"
            >
              <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="border border-border p-8 bg-surface">
        <div className="flex justify-between items-start mb-8">
          <h3 className="text-xs tracking-brand text-text-muted">قیمت لحظه‌ای طلا</h3>
          <Link href="/prices" className="text-xs text-text-muted hover:text-text-primary transition-colors">
            مشاهده تابلو
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <p className="text-sm text-text-secondary mb-1">قیمت خرید</p>
            <p className="text-xl font-num font-medium text-text-primary">{formatToman(Number(snapshot.buyPriceRial / BigInt(10)))}</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary mb-1">قیمت فروش</p>
            <p className="text-xl font-num font-medium text-text-primary">{formatToman(Number(snapshot.sellPriceRial / BigInt(10)))}</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary mb-1">نمودار</p>
            <div className="h-16 bg-surface-secondary flex items-center justify-center">
              <p className="text-xs text-text-muted">نمودار آینده</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
