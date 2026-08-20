import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { updateDeliveryStatusAction } from '@/app/actions/delivery';
import { toPersianDigits } from '@/lib/utils/format';
import { Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function AdminDeliveryPage() {
  const user = await getCurrentUser();
  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard');

  const deliveries = await db.deliveryOrder.findMany({
    where: { 
      status: { in: ['REQUESTED', 'PROCESSING', 'PACKAGED', 'SHIPPED'] } 
    },
    include: {
      user: {
        include: { profile: true }
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">مدیریت مرسولات</h1>
        <p className="text-sm text-text-secondary mt-1">درخواست‌های تحویل فیزیکی طلای کاربران</p>
      </div>

      <div className="grid gap-4">
        {deliveries.length === 0 ? (
          <div className="card-surface p-8 text-center text-text-secondary">
            هیچ درخواست تحویلی وجود ندارد.
          </div>
        ) : (
          deliveries.map(order => (
            <div key={order.id} className="card-surface p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold font-num text-lg text-gold-600">
                    {toPersianDigits((Number(order.weightNg) / 1_000_000_000).toFixed(2))} گرم
                  </span>
                  <span className="text-xs bg-surface-secondary px-2 py-1 rounded text-text-secondary">
                    وضعیت فعلی: {order.status}
                  </span>
                </div>
                <p className="text-sm">
                  <span className="text-text-muted">گیرنده:</span> {order.recipientName} ({order.recipientMobile})
                </p>
                <p className="text-sm mt-1">
                  <span className="text-text-muted">آدرس:</span> {order.city} - {order.deliveryAddress} (کد پستی: {order.postalCode})
                </p>
              </div>

              <div className="flex gap-2">
                {order.status === 'REQUESTED' && (
                  <form action={async () => {
                    'use server';
                    await updateDeliveryStatusAction(order.id, 'PROCESSING');
                  }}>
                    <Button variant="primary" size="sm" className="bg-info border-info hover:bg-info/90">
                      تأیید و پردازش
                    </Button>
                  </form>
                )}
                {order.status === 'PROCESSING' && (
                  <form action={async () => {
                    'use server';
                    await updateDeliveryStatusAction(order.id, 'SHIPPED', '123456789'); // Mock tracking code
                  }}>
                    <Button variant="primary" size="sm" className="bg-success border-success hover:bg-success/90" icon={<Truck className="h-4 w-4" />}>
                      ارسال شد
                    </Button>
                  </form>
                )}
                {order.status === 'SHIPPED' && (
                  <form action={async () => {
                    'use server';
                    await updateDeliveryStatusAction(order.id, 'DELIVERED');
                  }}>
                    <Button variant="primary" size="sm">
                      تحویل به مشتری
                    </Button>
                  </form>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
