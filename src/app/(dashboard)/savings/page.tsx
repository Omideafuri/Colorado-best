import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { createSavingsPlanAction, toggleSavingsPlanAction } from '@/app/actions/savings';
import { BarChart3, Plus, Play, Pause, PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatNumber,  } from '@/lib/utils/format';

export default async function SavingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const plans = await db.savingsPlan.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">پس‌انداز خودکار</h1>
        <p className="text-sm text-text-secondary mt-1">خرید منظم و مستمر طلا به صورت خودکار</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Create Plan Form */}
        <div className="md:col-span-1">
          <div className="card-surface p-6 sticky top-24">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-gold-600" />
              ایجاد برنامه جدید
            </h2>
            <form action={createSavingsPlanAction as unknown as string} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">نام برنامه</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="مثال: پس‌انداز ماهانه فرزندم"
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-gold-500"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">دوره زمانی</label>
                <select 
                  name="frequency"
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-gold-500"
                  required
                >
                  <option value="DAILY">روزانه</option>
                  <option value="WEEKLY">هفتگی</option>
                  <option value="MONTHLY">ماهانه</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">مبلغ هر دوره (تومان)</label>
                <input 
                  type="text" 
                  name="amount"
                  dir="ltr"
                  placeholder="500,000"
                  className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 font-num text-left outline-none focus:border-gold-500"
                  required 
                />
                <p className="text-xs text-text-muted mt-1.5">حداقل ۱۰۰ هزار تومان</p>
              </div>

              <Button 
                type="submit"
                variant="primary"
                className="w-full mt-2"
                icon={<Plus className="h-5 w-5" />}
              >
                ایجاد پس‌انداز جدید
              </Button>
            </form>
          </div>
        </div>

        {/* Active Plans List */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-semibold text-lg mb-4">برنامه‌های شما</h2>
          
          {plans.length === 0 ? (
            <div className="card-surface p-10 text-center text-text-secondary">
              <BarChart3 className="h-10 w-10 mx-auto text-text-muted mb-3 opacity-50" />
              <p>شما هنوز هیچ برنامه پس‌اندازی ندارید.</p>
              <p className="text-sm mt-2">با ایجاد برنامه، سیستم به طور خودکار برای شما طلا می‌خرد.</p>
            </div>
          ) : (
            plans.map(plan => (
              <div key={plan.id} className={`card-surface p-5 border-l-4 ${plan.status === 'ACTIVE' ? 'border-success' : 'border-warning'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <p className="text-sm text-text-secondary mt-1">
                      خرید <span className="font-bold text-text-primary">{formatNumber(Number(plan.amountRial) / 10)} تومان</span> به صورت{' '}
                      {plan.frequency === 'DAILY' ? 'روزانه' : plan.frequency === 'WEEKLY' ? 'هفتگی' : 'ماهانه'}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    plan.status === 'ACTIVE' ? 'bg-success-light text-success' : 'bg-warning-light text-warning'
                  }`}>
                    {plan.status === 'ACTIVE' ? 'فعال' : plan.status === 'PAUSED' ? 'متوقف شده' : plan.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm bg-surface-secondary p-3 rounded-lg">
                  <div>
                    <span className="text-text-muted block text-xs mb-1">کل پس‌انداز تاکنون</span>
                    <span className="font-bold font-num text-success">{formatNumber(Number(plan.totalSpentRial) / 10)} تومان</span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-xs mb-1">نوبت خرید بعدی</span>
                    <span className="font-bold font-num" dir="ltr">
                      {new Intl.DateTimeFormat('fa-IR').format(plan.nextExecution)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <form action={async () => {
                    'use server';
                    await toggleSavingsPlanAction(plan.id, plan.status);
                  }}>
                    <Button 
                      variant={plan.status === 'ACTIVE' ? 'secondary' : 'primary'}
                      size="sm"
                      icon={plan.status === 'ACTIVE' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    >
                      {plan.status === 'ACTIVE' ? 'توقف موقت' : 'فعال‌سازی مجدد'}
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
