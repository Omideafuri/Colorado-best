import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { formatNumber,   toPersianDigits } from '@/lib/utils/format';
import {   } from 'lucide-react';
import type { LedgerEntryType } from '@prisma/client';

const entryTypeLabels: Record<LedgerEntryType, string> = {
  DEPOSIT: 'واریز به حساب',
  WITHDRAWAL: 'برداشت از حساب',
  BUY_DEBIT: 'پرداخت بابت خرید طلا',
  BUY_CREDIT: 'دریافت طلا بابت خرید',
  SELL_DEBIT: 'کسر طلا بابت فروش',
  SELL_CREDIT: 'دریافت وجه بابت فروش',
  TRANSFER_IN: 'دریافت طلا از دیگران',
  TRANSFER_OUT: 'انتقال طلا به دیگران',
  FEE: 'کارمزد',
  DELIVERY_DEBIT: 'کسر طلا بابت تحویل',
  REFUND: 'برگشت وجه/طلا',
  ADJUSTMENT: 'اصلاحیه',
};

export default async function TransactionsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const transactions = await db.ledgerEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 50, // Limit to recent 50 for now
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-text-primary">تاریخچه تراکنش‌ها</h1>
        <p className="text-sm text-text-secondary mt-1">گزارش کامل واریز، برداشت و معاملات شما</p>
      </div>

      <div className="card-surface overflow-hidden">
        {transactions.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            هیچ تراکنشی یافت نشد.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-surface-secondary text-text-secondary border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">تاریخ و زمان</th>
                  <th className="px-4 py-3 font-medium">نوع تراکنش</th>
                  <th className="px-4 py-3 font-medium">کیف پول</th>
                  <th className="px-4 py-3 font-medium text-left">مبلغ / مقدار</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-surface-hover/50 transition-colors">
                    <td className="px-4 py-3 text-text-secondary font-num" dir="ltr">
                      {new Intl.DateTimeFormat('fa-IR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(tx.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-text-primary">
                        {entryTypeLabels[tx.entryType] || tx.entryType}
                      </span>
                      {tx.description && (
                        <p className="text-xs text-text-muted mt-0.5">{tx.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        tx.walletType === 'CASH' 
                          ? 'bg-info-light text-info' 
                          : 'bg-gold-100 text-gold-700'
                      }`}>
                        {tx.walletType === 'CASH' ? 'نقدی (تومان)' : 'طلا (گرم)'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-left">
                      <div className={`flex items-center justify-end gap-1 font-bold font-num ${
                        tx.direction === 'CREDIT' ? 'text-success' : 'text-danger'
                      }`}>
                        {tx.direction === 'CREDIT' ? '+' : '-'}
                        {tx.walletType === 'CASH' 
                          ? formatNumber(Number(tx.amount / 10n)) 
                          : toPersianDigits((Number(tx.amount) / 1_000_000_000).toFixed(4))
                        }
                      </div>
                      <p className="text-xs text-text-muted mt-0.5 text-left font-num" dir="ltr">
                        موجودی: {tx.walletType === 'CASH' 
                          ? formatNumber(Number(tx.balanceAfter / 10n)) 
                          : toPersianDigits((Number(tx.balanceAfter) / 1_000_000_000).toFixed(4))
                        }
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
