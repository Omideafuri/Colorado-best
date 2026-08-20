import { db } from '../src/lib/db';

async function checkInvariants() {
  console.log('Starting Ledger Invariant Checks...\n');
  let hasErrors = false;

  try {
    // 1. Check Cash Wallet Balances match Ledger Entries
    console.log('1. Verifying Cash Wallet Balances...');
    const cashWallets = await db.cashWallet.findMany();
    for (const wallet of cashWallets) {
      const entries = await db.ledgerEntry.findMany({
        where: { userId: wallet.userId, walletType: 'CASH' }
      });
      
      let calculatedBalance = BigInt(0);
      for (const entry of entries) {
        if (entry.direction === 'CREDIT') {
          calculatedBalance += entry.amount;
        } else {
          calculatedBalance -= entry.amount;
        }
      }

      if (calculatedBalance !== wallet.balanceRial) {
        console.error(`❌ CRITICAL: Cash Wallet mismatch for User ${wallet.userId}! Ledger: ${calculatedBalance}, Wallet: ${wallet.balanceRial}`);
        hasErrors = true;
      }
    }
    console.log('✅ Cash Wallets verified.');

    // 2. Check Gold Wallet Balances match Ledger Entries
    console.log('2. Verifying Gold Wallet Balances...');
    const goldWallets = await db.goldWallet.findMany();
    for (const wallet of goldWallets) {
      const entries = await db.ledgerEntry.findMany({
        where: { userId: wallet.userId, walletType: 'GOLD' }
      });
      
      let calculatedBalance = BigInt(0);
      for (const entry of entries) {
        if (entry.direction === 'CREDIT') {
          calculatedBalance += entry.amount;
        } else {
          calculatedBalance -= entry.amount;
        }
      }

      if (calculatedBalance !== wallet.balanceNg) {
        console.error(`❌ CRITICAL: Gold Wallet mismatch for User ${wallet.userId}! Ledger: ${calculatedBalance}, Wallet: ${wallet.balanceNg}`);
        hasErrors = true;
      }
    }
    console.log('✅ Gold Wallets verified.');

    // 3. Check Order trades match entries
    console.log('3. Verifying Trades vs Ledger...');
    const trades = await db.trade.findMany();
    for (const trade of trades) {
      // Find the corresponding ledger entries
      const entries = await db.ledgerEntry.findMany({
        where: { referenceType: 'TRADE', referenceId: trade.id }
      });

      if (entries.length === 0) {
        console.error(`❌ CRITICAL: Trade ${trade.id} has no Ledger Entries!`);
        hasErrors = true;
        continue;
      }

      // Check Gold movement
      const goldEntry = entries.find(e => e.walletType === 'GOLD');
      if (!goldEntry || goldEntry.amount !== trade.weightNg) {
         console.error(`❌ CRITICAL: Trade ${trade.id} gold entry mismatch. Trade: ${trade.weightNg}, Ledger: ${goldEntry?.amount}`);
         hasErrors = true;
      }

      // Check Fee movement
      const feeEntry = entries.find(e => e.walletType === 'CASH' && e.entryType === 'FEE');
      if (trade.feeRial > BigInt(0) && (!feeEntry || feeEntry.amount !== trade.feeRial)) {
         console.error(`❌ CRITICAL: Trade ${trade.id} fee entry mismatch. Trade: ${trade.feeRial}, Ledger: ${feeEntry?.amount}`);
         hasErrors = true;
      }

      // Check Cash movement
      const cashEntry = entries.find(e => e.walletType === 'CASH' && e.entryType !== 'FEE');
      if (!cashEntry || cashEntry.amount !== trade.totalRial) {
         console.error(`❌ CRITICAL: Trade ${trade.id} cash entry mismatch. Trade: ${trade.totalRial}, Ledger: ${cashEntry?.amount}`);
         hasErrors = true;
      }
    }
    console.log('✅ Trades verified.');

    if (hasErrors) {
      console.error('\n❌ Invariant Check Failed. Financial data corruption detected.');
      process.exit(1);
    } else {
      console.log('\n✅ All Financial Invariants Passed successfully.');
      process.exit(0);
    }
  } catch (err) {
    console.error('Error during invariant checks:', err);
    process.exit(1);
  }
}

checkInvariants();
