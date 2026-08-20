'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';
import { executeOrder } from '@/lib/financial/order';

export async function createSavingsPlanAction(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const name = formData.get('name') as string;
    const frequency = formData.get('frequency') as 'DAILY' | 'WEEKLY' | 'MONTHLY';
    const amountStr = formData.get('amount') as string; // in Toman
    
    if (!name || !frequency || !amountStr || isNaN(Number(amountStr))) {
      return { success: false, error: 'اطلاعات وارد شده نامعتبر است' };
    }

    const amountRial = BigInt(amountStr) * BigInt(10);

    // Calculate next execution based on frequency
    const nextExecution = new Date();
    if (frequency === 'DAILY') nextExecution.setDate(nextExecution.getDate() + 1);
    if (frequency === 'WEEKLY') nextExecution.setDate(nextExecution.getDate() + 7);
    if (frequency === 'MONTHLY') nextExecution.setMonth(nextExecution.getMonth() + 1);

    await db.savingsPlan.create({
      data: {
        userId: user.id,
        name,
        frequency,
        amountRial,
        status: 'ACTIVE',
        startDate: new Date(),
        nextExecution,
      }
    });

    revalidatePath('/savings');
    return { success: true };
  } catch (error: unknown) {
    console.error('Create savings plan error:', error);
    return { success: false, error: 'خطا در ساخت برنامه پس‌انداز' };
  }
}

export async function toggleSavingsPlanAction(planId: string, currentStatus: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const newStatus = currentStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';

    await db.savingsPlan.update({
      where: { 
        id: planId,
        userId: user.id // Security check
      },
      data: { status: newStatus }
    });

    revalidatePath('/savings');
    return { success: true };
  } catch {
    return { success: false, error: 'خطا در تغییر وضعیت برنامه' };
  }
}

/**
 * Note: This function would normally be triggered by a Cron Job (e.g. node-cron or Vercel Cron).
 * We export it here so we can simulate it if needed.
 */
export async function executeDueSavingsPlans() {
  const duePlans = await db.savingsPlan.findMany({
    where: {
      status: 'ACTIVE',
      nextExecution: { lte: new Date() }
    }
  });

  let successCount = 0;
  let failCount = 0;

  for (const plan of duePlans) {
    try {
      // Execute a BUY order on behalf of the user using Ledger engine
      await executeOrder({
        userId: plan.userId,
        tradeType: 'BUY',
        mode: 'BY_AMOUNT',
        value: plan.amountRial,
        idempotencyKey: `savings-${plan.id}-${plan.nextExecution.getTime()}`,
      });

      // Update plan next execution date
      const nextExec = new Date(plan.nextExecution);
      if (plan.frequency === 'DAILY') nextExec.setDate(nextExec.getDate() + 1);
      if (plan.frequency === 'WEEKLY') nextExec.setDate(nextExec.getDate() + 7);
      if (plan.frequency === 'MONTHLY') nextExec.setMonth(nextExec.getMonth() + 1);

      await db.savingsPlan.update({
        where: { id: plan.id },
        data: {
          totalSpentRial: { increment: plan.amountRial },
          lastExecuted: new Date(),
          nextExecution: nextExec
        }
      });

      successCount++;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`Failed to execute savings plan ${plan.id}:`, err.message);
      }
      failCount++;
      // If failed (e.g. insufficient balance), we might want to pause it or retry later.
      // For MVP, we just pause it.
      await db.savingsPlan.update({
        where: { id: plan.id },
        data: { status: 'PAUSED' }
      });
    }
  }

  return { successCount, failCount };
}
