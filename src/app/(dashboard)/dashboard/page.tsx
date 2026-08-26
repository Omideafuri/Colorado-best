import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { formatNumber, toPersianDigits } from '@/lib/utils/format';
import Link from 'next/link';
import { Wallet, TrendingUp, ArrowLeftRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const [cashWallet, goldWallet, snapshot] = await Promise.all([
    db.cashWallet.findUnique({ where: { userId: user.id } }),
    db.goldWallet.findUnique({ where: { userId: user.id } }),
    getLatestPriceSnapshot('18K'),
  ]);

  const cashBalanceRial = cashWallet?.balanceRial || BigInt(0);
  const goldBalanceNg = goldWallet?.balanceNg || BigInt(0);

  const cashBalanceToman = Number(cashBalanceRial / BigInt(10));
  const goldWeightGrams = Number(goldBalanceNg) / 1_000_000_000;

  const goldPriceToman = Number(snapshot.buyPriceRial / BigInt(10));
  const goldValueToman = Math.floor(goldWeightGrams * goldPriceToman);
  const totalPortfolioToman = cashBalanceToman + goldValueToman;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pt-4 pb-20">
      
      {/* Portfolio Master Room Hero Card */}
      <div className="bg-[#14182E] text-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#B35817]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="diamond-motif !w-2 !h-2 shadow-copper-glow" />
              <span className="text-xs tracking-brand font-semibold text-[#EBD8C1] uppercase">ارزش کل دارایی سرمایه‌گذار</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-num text-white tracking-tight">
                {toPersianDigits(formatNumber(totalPortfolioToman))}
              </span>
              <span className="text-sm sm:text-base font-normal text-[#EBD8C1]">تومان</span>
            </div>
            <p className="text-xs text-[#C7C0B3] mt-2 font-light">
              مجموع ارزش ریالی نقد و طلای ذخیره در خزانه امن
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/buy">
              <Button variant="primary" className="rounded-full px-6 text-xs font-bold shadow-copper-glow">
                خرید آنلاین طلا
              </Button>
            </Link>
            <Link href="/sell">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-6 text-xs font-bold">
                فروش موجودی
              </Button>
            </Link>
            <Link href="/wallet">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-6 text-xs font-bold">
                افزایش موجودی
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dual Wallets Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Gold Wallet Card */}
        <div className="bg-[#EBD8C1] text-[#161412] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#DFD8CB] shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs tracking-brand font-bold text-[#14182E] block mb-1 uppercase">موجودی خزانه طلا</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#161412]">طلای ۱۸ عیار استاندارد</h3>
              </div>
              <div className="p-3 rounded-2xl bg-white text-[#14182E] border border-[#DFD8CB] shadow-xs">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-num text-[#14182E]">
                  {toPersianDigits(goldWeightGrams.toFixed(4))}
                </span>
                <span className="text-sm font-semibold text-[#4A453E]">گرم</span>
              </div>
              <p className="text-xs font-num text-[#4A453E] font-light">
                ارزش تقریبی: {toPersianDigits(formatNumber(goldValueToman))} تومان
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DFD8CB] flex items-center justify-between">
            <Link href="/store" className="text-xs font-bold text-[#14182E] hover:text-[#B35817] flex items-center gap-1">
              <span>دریافت فیزیکی شمش</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <Link href="/transfer" className="text-xs font-bold text-[#14182E] hover:text-[#B35817] flex items-center gap-1">
              <span>انتقال طلا</span>
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Cash Wallet Card */}
        <div className="bg-white text-[#161412] p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8E2D7] shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs tracking-brand font-bold text-[#7E776C] block mb-1 uppercase">حساب نقدی ریالی</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#161412]">کیف پول شتابی</h3>
              </div>
              <div className="p-3 rounded-2xl bg-[#FAF8F4] text-[#B35817] border border-[#E8E2D7]">
                <Wallet className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-num text-[#14182E]">
                  {toPersianDigits(formatNumber(cashBalanceToman))}
                </span>
                <span className="text-sm font-semibold text-[#7E776C]">تومان</span>
              </div>
              <p className="text-xs font-num text-[#7E776C] font-light">
                آماده برای خرید آنی یا تسویه به حساب بانکی
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E2D7] flex items-center justify-between">
            <Link href="/wallet" className="text-xs font-bold text-[#14182E] hover:text-[#B35817] flex items-center gap-1">
              <span>افزایش موجودی</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <Link href="/transactions" className="text-xs font-bold text-[#7E776C] hover:text-[#161412] flex items-center gap-1">
              <span>تاریخچه تراکنش‌ها</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Quick Security & Operations Capsule */}
      <div className="bg-[#FAF8F4] p-5 rounded-2xl border border-[#E8E2D7] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A453E]">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#B35817]" />
          <span>پشتوانه دارایی شما در صندوق امانات بانک مرکزی با گواهی رسمی ری‌گیری محفوظ است.</span>
        </div>
        <Link href="/delivery" className="font-bold text-[#14182E] hover:text-[#B35817] whitespace-nowrap">
          ثبت درخواست تحویل فیزیکی ←
        </Link>
      </div>

    </div>
  );
}
