import { db } from '@/lib/db';
import { processLedgerEntry } from './ledger';
import { randomUUID } from 'node:crypto';

export async function depositCash(userId: string, amountRial: bigint, reference: string, idempotencyKey?: string) {
  const uniqueKey = idempotencyKey || randomUUID();

  return await db.$transaction(async (tx) => {
    const deposit = await tx.deposit.create({
      data: {
        userId,
        amountRial,
        status: 'COMPLETED', // In a real system, this happens after gateway callback
        paymentMethod: 'BANK_TRANSFER',
        paymentRef: reference,
        idempotencyKey: uniqueKey,
        completedAt: new Date(),
      }
    });

    await processLedgerEntry(tx, {
      userId,
      walletType: 'CASH',
      entryType: 'DEPOSIT',
      amount: amountRial,
      direction: 'CREDIT',
      referenceType: 'DEPOSIT',
      referenceId: deposit.id,
      description: 'واریز به حساب',
      idempotencyKey: `${uniqueKey}-ledger`,
    });

    return deposit;
  });
}

export async function withdrawCash(userId: string, amountRial: bigint, bankAccountId: string, idempotencyKey?: string) {
  const uniqueKey = idempotencyKey || randomUUID();

  return await db.$transaction(async (tx) => {
    // SECURITY: IDOR Check - Ensure bank account belongs to this user
    const bankAccount = await tx.bankAccount.findUnique({
      where: { id: bankAccountId }
    });
    
    if (!bankAccount || bankAccount.userId !== userId) {
      throw new Error('حساب بانکی نامعتبر است');
    }

    // Note: In reality, withdrawal creates a PENDING record and debits the user immediately.
    // The admin later approves it to send via Paya/Satna.
    const withdrawal = await tx.withdrawal.create({
      data: {
        userId,
        amountRial,
        status: 'PENDING',
        bankAccountId,
        idempotencyKey: uniqueKey,
      }
    });

    await processLedgerEntry(tx, {
      userId,
      walletType: 'CASH',
      entryType: 'WITHDRAWAL',
      amount: amountRial,
      direction: 'DEBIT',
      referenceType: 'WITHDRAWAL',
      referenceId: withdrawal.id,
      description: 'درخواست برداشت وجه',
      idempotencyKey: `${uniqueKey}-ledger`,
    });

    return withdrawal;
  });
}

export async function transferGold(senderId: string, receiverId: string, weightNg: bigint, idempotencyKey?: string) {
  if (senderId === receiverId) throw new Error('امکان انتقال به خود وجود ندارد');
  
  const uniqueKey = idempotencyKey || randomUUID();

  return await db.$transaction(async (tx) => {
    const transfer = await tx.goldTransfer.create({
      data: {
        senderId,
        receiverId,
        weightNg,
        status: 'COMPLETED',
        transferMethod: 'USER_ID',
        idempotencyKey: uniqueKey,
        completedAt: new Date(),
      }
    });

    // Debit Sender
    await processLedgerEntry(tx, {
      userId: senderId,
      walletType: 'GOLD',
      entryType: 'TRANSFER_OUT',
      amount: weightNg,
      direction: 'DEBIT',
      referenceType: 'TRANSFER',
      referenceId: transfer.id,
      description: 'انتقال طلا به کاربر دیگر',
      idempotencyKey: `${uniqueKey}-sender`,
    });

    // Credit Receiver
    await processLedgerEntry(tx, {
      userId: receiverId,
      walletType: 'GOLD',
      entryType: 'TRANSFER_IN',
      amount: weightNg,
      direction: 'CREDIT',
      referenceType: 'TRANSFER',
      referenceId: transfer.id,
      description: 'دریافت طلا از کاربر',
      idempotencyKey: `${uniqueKey}-receiver`,
    });

    return transfer;
  });
}
