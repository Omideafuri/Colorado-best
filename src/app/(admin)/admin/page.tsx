import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { formatNumber, toPersianDigits } from '@/lib/utils/format';
import { Users, Shield, TrendingUp, Package, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/login');

  const [
    userCount,
    pendingKycCount,
    pendingDeliveryCount,
    totalGoldWallet,
    totalCashWallet,
  ] = await Promise.all([
    db.user.count(),
    db.kycApplication.count({ where: { status: 'PENDING' } }),
    db.deliveryOrder.count({ where: { status: 'REQUESTED' } }),
    db.goldWallet.aggregate({ _sum: { balanceNg: true } }),
    db.cashWallet.aggregate({ _sum: { balanceRial: true } }),
  ]);

  const totalGoldGrams = Number(totalGoldWallet._sum.balanceNg || BigInt(0)) / 1_000_000_000;
  const totalCashToman = Number((totalCashWallet._sum.balanceRial || BigInt(0)) / BigInt(10));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#DFD7B5] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="diamond-motif !w-2 !h-2" />
            <span className="text-xs tracking-brand font-semibold text-[#8C775D] uppercase">
              میز پایش و کنترل ریسک
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2A1A08] tracking-tight">داشبورد مرکزی مدیریت</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/prices"
            className="text-xs bg-[#3A230A] text-white px-4 py-2.5 rounded-full hover:bg-[#231506] transition-colors flex items-center gap-1.5 shadow-floating-sm"
          >
            <span>تنظیم نرخ و کارمزدها</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Users */}
        <div className="floating-card p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-[#8C775D] font-semibold">کل سرمایه‌گذاران</span>
            <div className="p-2.5 rounded-xl bg-[#FAF8EE] text-[#3A230A] border border-[#DFD7B5]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold font-num text-[#2A1A08]">{toPersianDigits(userCount.toString())}</p>
            <span className="text-[11px] text-[#8C775D] mt-1 block">کاربران ثبت‌نام‌شده در پلتفرم</span>
          </div>
        </div>

        {/* Card 2: Vault Gold */}
        <div className="floating-card p-6 bg-[#EEE9C1] border-[#D1C79D] flex flex-col justify-between text-[#2A1A08]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-[#3A230A] font-bold">کل طلای در گردش</span>
            <div className="p-2.5 rounded-xl bg-white text-[#3A230A] border border-[#DFD7B5]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold font-num text-[#3A230A]">{toPersianDigits(totalGoldGrams.toFixed(2))} <span className="text-sm font-normal">گرم</span></p>
            <span className="text-[11px] text-[#57442D] mt-1 block">مجموع تعهد فیزیکی در خزانه</span>
          </div>
        </div>

        {/* Card 3: Pending KYC */}
        <div className="floating-card p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-[#8C775D] font-semibold">احراز هویت در انتظار</span>
            <div className="p-2.5 rounded-xl bg-[#FAF8EE] text-[#A4530C] border border-[#DFD7B5]">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold font-num text-[#A4530C]">{toPersianDigits(pendingKycCount.toString())}</p>
            <Link href="/admin/kyc" className="text-[11px] text-[#A4530C] hover:underline mt-1 inline-block">
              بررسی پرونده‌های جدید ←
            </Link>
          </div>
        </div>

        {/* Card 4: Pending Delivery */}
        <div className="floating-card p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs text-[#8C775D] font-semibold">سفارشات تحویل فیزیکی</span>
            <div className="p-2.5 rounded-xl bg-[#FAF8EE] text-[#556B54] border border-[#DFD7B5]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold font-num text-[#2A1A08]">{toPersianDigits(pendingDeliveryCount.toString())}</p>
            <Link href="/admin/delivery" className="text-[11px] text-[#556B54] hover:underline mt-1 inline-block">
              مدیریت ارسال و بسته‌بندی ←
            </Link>
          </div>
        </div>
      </div>

      {/* Cash Reserves Summary */}
      <div className="floating-card-dark p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-xs tracking-brand font-semibold text-[#EEE9C1] block mb-1 uppercase">مجموع سپرده‌های نقدی کاربران</span>
          <p className="text-3xl sm:text-4xl font-extrabold font-num text-white">{toPersianDigits(formatNumber(totalCashToman))} <span className="text-base font-normal text-[#EEE9C1]">تومان</span></p>
        </div>
        <Link
          href="/admin/reports"
          className="floating-btn-amber px-6 py-3 rounded-full text-xs font-bold"
        >
          دریافت گزارش مالی جامع
        </Link>
      </div>

    </div>
  );
}
