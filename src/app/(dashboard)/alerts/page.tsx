import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { createAlertAction, deleteAlertAction } from '@/app/actions/alerts';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { Bell, BellRing, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { formatNumber,  } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

export default async function AlertsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const snapshot = await getLatestPriceSnapshot('18K');
  const currentPriceToman = Number(snapshot.buyPriceRial / BigInt(10));

  const alerts = await db.priceAlert.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">هشدارهای قیمت</h1>
        <p className="text-sm text-text-secondary mt-1">با تعیین هدف، پیامک اطلاع‌رسانی دریافت کنید</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Create Alert Form */}
        <div className="md:col-span-1">
          <div className="card-surface p-6 sticky top-24">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-gold-600" />
              هشدار جدید
            </h2>
            
            <div className="bg-surface-secondary p-3 rounded-lg mb-5 text-sm text-center">
              <p className="text-text-secondary mb-1">قیمت فعلی (خرید)</p>
              <p className="font-bold font-num text-lg">{formatNumber(currentPriceToman)} تومان</p>
            </div>

            <form action={createAlertAction as unknown as string} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">شرط هشدار</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="relative flex cursor-pointer rounded-lg border border-border bg-surface p-3 hover:bg-surface-hover">
                    <input type="radio" name="conditionType" value="ABOVE" className="peer sr-only" defaultChecked />
                    <div className="flex w-full items-center justify-between text-sm">
                      <span className="font-medium text-text-primary">بالاتر از</span>
                      <TrendingUp className="h-4 w-4 text-success" />
                    </div>
                    <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-gold-500 pointer-events-none"></div>
                  </label>
                  <label className="relative flex cursor-pointer rounded-lg border border-border bg-surface p-3 hover:bg-surface-hover">
                    <input type="radio" name="conditionType" value="BELOW" className="peer sr-only" />
                    <div className="flex w-full items-center justify-between text-sm">
                      <span className="font-medium text-text-primary">پایین‌تر از</span>
                      <TrendingDown className="h-4 w-4 text-danger" />
                    </div>
                    <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-gold-500 pointer-events-none"></div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">قیمت هدف (تومان)</label>
                <input 
                  type="text" 
                  name="targetPrice"
                  dir="ltr"
                  placeholder={formatNumber(currentPriceToman)}
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 font-num text-left outline-none focus:border-gold-500"
                  required 
                />
              </div>

              <Button 
                type="submit"
                className="w-full mt-2"
              >
                ثبت هشدار
              </Button>
            </form>
          </div>
        </div>

        {/* Alerts List */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-semibold text-lg mb-4">هشدارهای شما</h2>
          
          {alerts.length === 0 ? (
            <div className="card-surface p-10 text-center text-text-secondary">
              <BellRing className="h-10 w-10 mx-auto text-text-muted mb-3 opacity-50" />
              <p>شما هیچ هشدار فعالی ندارید.</p>
            </div>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className="card-surface p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    alert.isTriggered 
                      ? 'bg-surface-secondary text-text-muted' 
                      : alert.conditionType === 'ABOVE' ? 'bg-success-light text-success' : 'bg-danger-light text-danger'
                  }`}>
                    {alert.isTriggered ? <Bell className="h-5 w-5" /> : <BellRing className="h-5 w-5" />}
                  </div>
                  
                  <div>
                    <h3 className={`font-bold font-num text-lg ${alert.isTriggered ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                      {alert.targetPriceRial ? formatNumber(Number(alert.targetPriceRial / BigInt(10))) : 0} تومان
                    </h3>
                    <p className="text-sm text-text-secondary mt-0.5">
                      {alert.conditionType === 'ABOVE' ? 'هنگامی که قیمت بالاتر رفت' : 'هنگامی که قیمت پایین‌تر آمد'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    alert.isTriggered ? 'bg-surface-secondary text-text-muted' : 'bg-gold-100 text-gold-700'
                  }`}>
                    {alert.isTriggered ? 'به هدف رسید' : 'فعال'}
                  </span>
                  
                  <form action={async () => {
                    'use server';
                    await deleteAlertAction(alert.id);
                  }}>
                    <Button
                      type="submit"
                      variant="danger"
                      size="icon"
                      title="حذف هشدار"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
