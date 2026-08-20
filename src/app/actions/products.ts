'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';
import { getLatestPriceSnapshot } from '@/lib/financial/pricing';
import { processLedgerEntry } from '@/lib/financial/ledger';
import { calculateCashAmount, calculateFee } from '@/lib/financial/decimal';
import { randomUUID } from 'node:crypto';

export async function buyProductAction(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const productId = formData.get('productId') as string;
    const idempotencyKey = (formData.get('idempotencyKey') as string) || randomUUID();

    if (!productId) return { success: false, error: 'محصول نامعتبر است' };

    const product = await db.product.findUnique({
      where: { id: productId, isAvailable: true }
    });

    if (!product) return { success: false, error: 'محصول یافت نشد یا ناموجود است' };

    // Get live price
    const snapshot = await getLatestPriceSnapshot(product.goldType);
    
    // Calculate price: (weight * price per gram) + premium + making charge
    const baseValueRial = calculateCashAmount(product.weightNg, snapshot.buyPriceRial);
    const premiumRial = calculateFee(baseValueRial, product.premiumBp);
    const totalPriceRial = baseValueRial + premiumRial + product.makingChargeRial;

    await db.$transaction(async (tx) => {
      // Check idempotency for DeliveryOrder
      const existing = await tx.deliveryOrder.findUnique({
        where: { idempotencyKey }
      });

      if (existing) {
        return existing;
      }

      // 1. Atomically deduct inventory
      const invUpdate = await tx.product.updateMany({
        where: { id: product.id, quantityAvailable: { gt: 0 } },
        data: {
          quantityAvailable: { decrement: 1 },
          quantityReserved: { increment: 1 }
        }
      });

      if (invUpdate.count === 0) {
        throw new Error('موجودی محصول به اتمام رسیده است');
      }

      // 2. Create Delivery Order immediately for physical products
      const deliveryOrder = await tx.deliveryOrder.create({
        data: {
          userId: user.id,
          productId: product.id,
          weightNg: product.weightNg,
          status: 'REQUESTED',
          recipientName: user.profile?.firstName ? `${user.profile.firstName} ${user.profile.lastName}` : 'کاربر',
          recipientMobile: user.mobile,
          deliveryAddress: 'نیاز به تکمیل آدرس توسط کاربر',
          city: 'نامشخص',
          province: 'نامشخص',
          postalCode: '0000000000',
          shippingFeeRial: BigInt(0),
          insuranceFeeRial: BigInt(0),
          idempotencyKey,
        }
      });

      // 2. Deduct Cash Wallet
      await processLedgerEntry(tx, {
        userId: user.id,
        walletType: 'CASH',
        entryType: 'BUY_DEBIT',
        amount: totalPriceRial,
        direction: 'DEBIT',
        referenceType: 'PRODUCT_STORE',
        referenceId: deliveryOrder.id,
        description: `خرید فیزیکی: ${product.nameFa}`,
        idempotencyKey: `${idempotencyKey}-cash-debit`,
      });
    });

    revalidatePath('/store');
    revalidatePath('/delivery');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Buy product error:', error);
      if (error.message.includes('موجودی نقدی ناکافی است')) {
        return { success: false, error: 'موجودی نقدی شما برای خرید این محصول کافی نیست' };
      }
    }
    return { success: false, error: 'خطا در ثبت سفارش کالا' };
  }
}
