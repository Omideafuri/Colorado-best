'use server';

import { getCurrentUser } from '@/lib/auth/session';
import { executeOrder } from '@/lib/financial/order';
import { depositCash } from '@/lib/financial/wallet';
import { revalidatePath } from 'next/cache';

export async function buyGoldAction(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'نشست کاربری نامعتبر است' };

    const mode = formData.get('mode') as 'BY_AMOUNT' | 'BY_WEIGHT';
    const valueStr = formData.get('value') as string;
    const idempotencyKey = formData.get('idempotencyKey') as string || crypto.randomUUID();
    
    if (!valueStr || isNaN(Number(valueStr))) {
      return { success: false, error: 'مقدار نامعتبر است' };
    }

    const value = BigInt(valueStr);

    const order = await executeOrder({
      userId: user.id,
      tradeType: 'BUY',
      mode,
      value,
      idempotencyKey,
    });

    revalidatePath('/dashboard');
    return { success: true, orderId: order.id };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Buy gold error:', error);
      return { success: false, error: error.message || 'خطا در ثبت سفارش خرید' };
    }
    return { success: false, error: 'خطا در ثبت سفارش خرید' };
  }
}

export async function sellGoldAction(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'نشست کاربری نامعتبر است' };

    const mode = formData.get('mode') as 'BY_AMOUNT' | 'BY_WEIGHT';
    const valueStr = formData.get('value') as string;
    const idempotencyKey = formData.get('idempotencyKey') as string || crypto.randomUUID();
    
    if (!valueStr || isNaN(Number(valueStr))) {
      return { success: false, error: 'مقدار وارد شده نامعتبر است' };
    }

    const value = BigInt(valueStr);

    const order = await executeOrder({
      userId: user.id,
      tradeType: 'SELL',
      mode,
      value,
      idempotencyKey,
    });

    revalidatePath('/dashboard');
    return { success: true, orderId: order.id };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Sell gold error:', error);
      return { success: false, error: error.message || 'خطا در ثبت سفارش فروش' };
    }
    return { success: false, error: 'خطا در ثبت سفارش فروش' };
  }
}

export async function depositAction(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'نشست کاربری نامعتبر است' };

    const amountStr = formData.get('amount') as string;
    const idempotencyKey = formData.get('idempotencyKey') as string || crypto.randomUUID();

    if (!amountStr || isNaN(Number(amountStr))) {
      return { success: false, error: 'مبلغ وارد شده نامعتبر است' };
    }

    const amountRial = BigInt(amountStr) * BigInt(10); // Assume input is Toman
    const reference = `DEP-${Date.now()}`;

    await depositCash(user.id, amountRial, reference, idempotencyKey);

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message || 'خطا در افزایش موجودی' };
    }
    return { success: false, error: 'خطا در افزایش موجودی' };
  }
}
