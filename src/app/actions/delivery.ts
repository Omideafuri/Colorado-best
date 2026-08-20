'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { processLedgerEntry } from '@/lib/financial/ledger';
import { revalidatePath } from 'next/cache';

export async function requestDeliveryAction(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const weightStr = formData.get('weightGrams') as string;
    const recipientName = formData.get('recipientName') as string;
    const recipientMobile = formData.get('recipientMobile') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const postalCode = formData.get('postalCode') as string;
    const idempotencyKey = formData.get('idempotencyKey') as string || crypto.randomUUID();

    if (!weightStr || isNaN(Number(weightStr))) {
      return { success: false, error: 'وزن درخواستی نامعتبر است' };
    }

    const weightNg = BigInt(Number(weightStr) * 1_000_000_000);

    await db.$transaction(async (tx) => {
      const existing = await tx.deliveryOrder.findUnique({ where: { idempotencyKey }});
      if (existing) return existing;

      // 1. Create Delivery Order
      const deliveryOrder = await tx.deliveryOrder.create({
        data: {
          userId: user.id,
          idempotencyKey,
          weightNg,
          status: 'REQUESTED',
          recipientName,
          recipientMobile,
          deliveryAddress: address,
          city,
          province: city, // Fallback for MVP since we didn't add it to UI
          postalCode,
          shippingFeeRial: BigInt(500000), // Static fee for MVP
          insuranceFeeRial: BigInt(200000),
        }
      });

      // 2. Deduct Gold
      await processLedgerEntry(tx, {
        userId: user.id,
        walletType: 'GOLD',
        entryType: 'DELIVERY_DEBIT',
        amount: weightNg,
        direction: 'DEBIT',
        referenceType: 'DELIVERY',
        referenceId: deliveryOrder.id,
        description: 'درخواست تحویل فیزیکی طلا',
        idempotencyKey: `${idempotencyKey}-gold`,
      });
      
      // 3. Deduct Cash for shipping (assuming they have cash, otherwise we'd need to check/fail)
      const totalFees = BigInt(700000); // 50k + 20k Toman = 700,000 Rial
      await processLedgerEntry(tx, {
        userId: user.id,
        walletType: 'CASH',
        entryType: 'FEE',
        amount: totalFees,
        direction: 'DEBIT',
        referenceType: 'DELIVERY',
        referenceId: deliveryOrder.id,
        description: 'هزینه ارسال و بیمه فیزیکی طلا',
        idempotencyKey: `${idempotencyKey}-cash`,
      });
    });

    revalidatePath('/delivery');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Delivery request error:', error);
      if (error.message.includes('موجودی نقدی ناکافی است')) {
          return { success: false, error: 'موجودی نقدی برای پرداخت هزینه ارسال کافی نیست' };
      }
      if (error.message.includes('موجودی طلای ناکافی است')) {
          return { success: false, error: 'موجودی طلا برای تحویل کافی نیست' };
      }
    }
    return { success: false, error: 'خطا در ثبت درخواست تحویل' };
  }
}

export async function updateDeliveryStatusAction(orderId: string, status: 'PROCESSING' | 'PACKAGED' | 'SHIPPED' | 'DELIVERED', trackingCode?: string) {
  try {
    const admin = await getCurrentUser();
    if (!admin || !['ADMIN', 'SUPER_ADMIN'].includes(admin.role)) {
      return { success: false, error: 'Unauthorized' };
    }

    const order = await db.deliveryOrder.findUnique({ where: { id: orderId } });
    if (!order) return { success: false, error: 'سفارش یافت نشد' };

    // Prevent backwards transitions or redundant updates
    const states = ['REQUESTED', 'VERIFIED', 'PROCESSING', 'PACKAGED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    const currentIndex = states.indexOf(order.status);
    const newIndex = states.indexOf(status);

    if (newIndex <= currentIndex) {
      return { success: false, error: 'وضعیت جدید نامعتبر است (امکان بازگشت به وضعیت قبلی وجود ندارد)' };
    }

    const data: Record<string, unknown> = { status };
    if (trackingCode) data.trackingCode = trackingCode;
    if (status === 'SHIPPED') data.shippedAt = new Date();
    if (status === 'DELIVERED') data.deliveredAt = new Date();

    // Use updateMany to prevent concurrent conflicting updates
    const result = await db.deliveryOrder.updateMany({
      where: { id: orderId, status: order.status },
      data
    });

    if (result.count === 0) {
       return { success: false, error: 'وضعیت سفارش در این حین تغییر کرده است. صفحه را رفرش کنید.' };
    }

    revalidatePath('/admin/delivery');
    return { success: true };
  } catch (error: unknown) {
    console.error('Update delivery error:', error);
    return { success: false, error: 'خطا در بروزرسانی وضعیت' };
  }
}
