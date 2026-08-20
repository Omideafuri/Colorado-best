import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { requestDeliveryAction } from '@/app/actions/delivery';
import {  Info } from 'lucide-react';
import {  toPersianDigits } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

export default async function DeliveryPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const goldWallet = await db.goldWallet.findUnique({ where: { userId: user.id } });
  const goldBalanceNg = goldWallet?.balanceNg || 0n;
  const goldGrams = Number(goldBalanceNg) / 1_000_000_000;

  const deliveries = await db.deliveryOrder.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">دریافت فیزیکی طلا</h1>
        <p className="text-sm text-text-secondary mt-1">ارسال طلای ۱۸ عیار شمش یا آب‌شده به آدرس شما</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Request Form */}
        <div className="card-surface p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-lg">درخواست جدید</h2>
            <div className="text-sm">
              موجودی: <span className="font-bold font-num text-gold-600">{toPersianDigits(goldGrams.toFixed(4))} گرم</span>
            </div>
          </div>

          <form action={requestDeliveryAction as unknown as string} className="space-y-4">
            <input type="hidden" name="idempotencyKey" value={crypto.randomUUID()} />
            <div>
              <label className="block text-sm font-medium mb-1">وزن درخواستی (گرم)</label>
              <input 
                type="text" 
                name="weightGrams"
                dir="ltr"
                placeholder="حداقل ۱ گرم"
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 font-num text-left outline-none focus:border-gold-500"
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">نام گیرنده</label>
                <input 
                  type="text" 
                  name="recipientName"
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-gold-500"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">موبایل گیرنده</label>
                <input 
                  type="text" 
                  name="recipientMobile"
                  dir="ltr"
                  maxLength={11}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 font-num text-left outline-none focus:border-gold-500"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">آدرس کامل</label>
              <textarea 
                name="address"
                rows={3}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-gold-500 resize-none"
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">شهر</label>
                <input 
                  type="text" 
                  name="city"
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-gold-500"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">کد پستی</label>
                <input 
                  type="text" 
                  name="postalCode"
                  dir="ltr"
                  maxLength={10}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 font-num text-left outline-none focus:border-gold-500"
                  required 
                />
              </div>
            </div>

            <div className="bg-warning-light/50 p-3 rounded-lg flex gap-3 text-sm text-warning-dark mt-4">
              <Info className="h-5 w-5 flex-shrink-0" />
              <p>هزینه ثابت ارسال (۵۰,۰۰۰ تومان) و بیمه (۲۰,۰۰۰ تومان) از کیف پول نقدی شما کسر خواهد شد.</p>
            </div>

            <Button 
              type="submit"
              className="w-full mt-2"
            >
              ثبت درخواست و پرداخت هزینه
            </Button>
          </form>
        </div>

        {/* History list */}
        <div className="card-surface p-6">
          <h2 className="font-semibold text-lg mb-4">پیگیری سفارشات</h2>
          {deliveries.length === 0 ? (
            <div className="text-center py-10 text-text-muted text-sm">
              سفارش تحویلی ثبت نکرده‌اید.
            </div>
          ) : (
            <div className="space-y-4">
              {deliveries.map(order => (
                <div key={order.id} className="border border-border rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-lg font-num">
                      {toPersianDigits((Number(order.weightNg) / 1_000_000_000).toFixed(2))} گرم
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      order.status === 'DELIVERED' ? 'bg-success-light text-success' :
                      order.status === 'SHIPPED' ? 'bg-info-light text-info' :
                      'bg-warning-light text-warning'
                    }`}>
                      {order.status === 'REQUESTED' ? 'درخواست شده' :
                       order.status === 'VERIFIED' ? 'تأیید شده' :
                       order.status === 'PROCESSING' ? 'در حال آماده‌سازی' :
                       order.status === 'PACKAGED' ? 'بسته‌بندی شده' :
                       order.status === 'SHIPPED' ? 'ارسال شده' :
                       order.status === 'DELIVERED' ? 'تحویل داده شد' : 'لغو شده'}
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary space-y-1">
                    <p>گیرنده: {order.recipientName}</p>
                    <p className="truncate">آدرس: {order.deliveryAddress}</p>
                    {order.trackingCode && (
                      <p className="mt-2 text-info font-medium font-num">
                        کد رهگیری: {order.trackingCode}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
