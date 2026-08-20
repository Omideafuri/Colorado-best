
import { randomUUID } from 'node:crypto';
import type { Prisma, LedgerEntryType } from '@prisma/client';

export type TransactionParams = {
  userId: string;
  walletType: 'CASH' | 'GOLD';
  entryType: LedgerEntryType;
  amount: bigint;
  direction: 'CREDIT' | 'DEBIT';
  referenceType: string;
  referenceId: string;
  description?: string;
  idempotencyKey?: string;
};

/**
 * Core ledger engine: Processes a single financial movement atomically.
 * MUST be called inside a Prisma transaction (tx).
 */
export async function processLedgerEntry(
  tx: Prisma.TransactionClient,
  params: TransactionParams
) {
  if (params.amount <= BigInt(0)) {
    throw new Error('مبلغ تراکنش باید بزرگتر از صفر باشد');
  }

  const idempotencyKey = params.idempotencyKey || randomUUID();

  // 1. Check idempotency (prevent double spending/crediting)
  const existing = await tx.ledgerEntry.findUnique({
    where: { idempotencyKey },
  });

  if (existing) {
    return existing; // Already processed
  }

  // 2. Process based on Wallet Type
  if (params.walletType === 'CASH') {
    const wallet = await tx.cashWallet.findUnique({
      where: { userId: params.userId },
    });

    if (!wallet) throw new Error('کیف پول نقدی یافت نشد');

    if (params.direction === 'DEBIT' && wallet.balanceRial < params.amount) {
      throw new Error('موجودی نقدی ناکافی است');
    }

    const newBalance =
      params.direction === 'CREDIT'
        ? wallet.balanceRial + params.amount
        : wallet.balanceRial - params.amount;

    // Optimistic Concurrency Control using version field
    const updateResult = await tx.cashWallet.updateMany({
      where: { id: wallet.id, version: wallet.version },
      data: { balanceRial: newBalance, version: { increment: 1 } },
    });

    if (updateResult.count === 0) {
      throw new Error('تداخل تراکنش (Concurrency Error). لطفاً دوباره تلاش کنید.');
    }

    return await tx.ledgerEntry.create({
      data: {
        userId: params.userId,
        walletType: 'CASH',
        entryType: params.entryType,
        amount: params.amount,
        direction: params.direction,
        balanceAfter: newBalance,
        referenceType: params.referenceType,
        referenceId: params.referenceId,
        description: params.description,
        idempotencyKey,
      },
    });
  } else {
    // GOLD Wallet
    const wallet = await tx.goldWallet.findUnique({
      where: { userId: params.userId },
    });

    if (!wallet) throw new Error('کیف پول طلا یافت نشد');

    if (params.direction === 'DEBIT' && wallet.balanceNg < params.amount) {
      throw new Error('موجودی طلای ناکافی است');
    }

    const newBalance =
      params.direction === 'CREDIT'
        ? wallet.balanceNg + params.amount
        : wallet.balanceNg - params.amount;

    // Optimistic Concurrency Control
    const updateResult = await tx.goldWallet.updateMany({
      where: { id: wallet.id, version: wallet.version },
      data: { balanceNg: newBalance, version: { increment: 1 } },
    });

    if (updateResult.count === 0) {
      throw new Error('تداخل تراکنش (Concurrency Error). لطفاً دوباره تلاش کنید.');
    }

    return await tx.ledgerEntry.create({
      data: {
        userId: params.userId,
        walletType: 'GOLD',
        entryType: params.entryType,
        amount: params.amount,
        direction: params.direction,
        balanceAfter: newBalance,
        referenceType: params.referenceType,
        referenceId: params.referenceId,
        description: params.description,
        idempotencyKey,
      },
    });
  }
}
