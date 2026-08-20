import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { Settings } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { Button } from '@/components/ui/button';

async function updatePriceConfig(formData: FormData) {
  'use strict';
  'use server';
  
  const user = await getCurrentUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) throw new Error('Unauthorized');

  const buySpreadBp = Number(formData.get('buySpreadBp'));
  const sellSpreadBp = Number(formData.get('sellSpreadBp'));
  const feeBp = Number(formData.get('feeBp'));
  
  if (isNaN(buySpreadBp) || isNaN(sellSpreadBp) || isNaN(feeBp)) return;

  // Archive old configs by setting isActive = false
  await db.priceConfig.updateMany({
    where: { isActive: true },
    data: { isActive: false }
  });

  // Create new active config
  await db.priceConfig.create({
    data: {
      goldType: '18K',
      buySpreadBp,
      sellSpreadBp,
      feeBp,
      minBuyRial: BigInt(1000000),
      maxBuyRial: BigInt(500000000),
      minSellNg: BigInt(10000000),
      isActive: true,
      updatedById: user.id
    }
  });

  revalidatePath('/admin/prices');
}

export default async function AdminPricesPage() {
  const user = await getCurrentUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard');

  let activeConfig = await db.priceConfig.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  if (!activeConfig) {
    activeConfig = {
      id: 'default',
      goldType: '18K',
      buySpreadBp: 150, // 1.5%
      sellSpreadBp: 150, // 1.5%
      feeBp: 50, // 0.5%
      minBuyRial: BigInt(1000000),
      maxBuyRial: BigInt(500000000),
      minSellNg: BigInt(10000000),
      isActive: true,
      updatedById: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary">تنظیمات قیمت‌گذاری و کارمزد</h1>
        <p className="text-sm text-text-secondary mt-1">مدیریت اسپرد و کارمزدهای پلتفرم</p>
      </div>

      <div className="card-surface p-6">
        <form action={updatePriceConfig} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                اسپرد خرید (Basis Points)
              </label>
              <input 
                name="buySpreadBp"
                type="number" 
                defaultValue={activeConfig.buySpreadBp}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-left font-num outline-none focus:border-info"
              />
              <p className="text-xs text-text-muted mt-1.5">۱۰۰ واحد = ۱ درصد اضافه روی قیمت خرید</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                اسپرد فروش (Basis Points)
              </label>
              <input 
                name="sellSpreadBp"
                type="number" 
                defaultValue={activeConfig.sellSpreadBp}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-left font-num outline-none focus:border-info"
              />
              <p className="text-xs text-text-muted mt-1.5">۱۰۰ واحد = ۱ درصد کسر از قیمت فروش</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                کارمزد معاملات (Basis Points)
              </label>
              <input 
                name="feeBp"
                type="number" 
                defaultValue={activeConfig.feeBp}
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-left font-num outline-none focus:border-info"
              />
              <p className="text-xs text-text-muted mt-1.5">۵۰ واحد = ۰.۵ درصد کارمزد ثابت</p>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <Button 
              type="submit"
              variant="primary"
              icon={<Settings className="h-4 w-4" />}
            >
              ذخیره تنظیمات جدید
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
