import { db } from '../src/lib/db';

async function runReconciliation() {
  console.log('🔄 Starting Reconciliation Engine...\n');

  try {
    // 1. Calculate Total System Liabilities (What we owe users)
    console.log('Calculating Liabilities...');
    const cashWallets = await db.cashWallet.aggregate({ _sum: { balanceRial: true } });
    const goldWallets = await db.goldWallet.aggregate({ _sum: { balanceNg: true } });

    const totalCashLiabilityRial = cashWallets._sum.balanceRial || BigInt(0);
    const totalGoldLiabilityNg = goldWallets._sum.balanceNg || BigInt(0);

    console.log(`- Total User Cash Liability: ${totalCashLiabilityRial.toString()} Rial`);
    console.log(`- Total User Gold Liability: ${totalGoldLiabilityNg.toString()} ng`);

    // 2. Fetch Total System Assets (What we actually have in bank/vault)
    console.log('\nFetching Assets (Mocking Bank & Vault APIs)...');
    
    // In a real production system, this would call the actual Bank API and the Physical Vault API
    // For this MVP, we assume the system is perfectly balanced (Assets = Liabilities) 
    // but we allow injecting environmental overrides to test mismatches.
    const actualBankBalanceRial = process.env.MOCK_BANK_BALANCE_RIAL 
      ? BigInt(process.env.MOCK_BANK_BALANCE_RIAL) 
      : totalCashLiabilityRial;
      
    const actualVaultGoldNg = process.env.MOCK_VAULT_GOLD_NG
      ? BigInt(process.env.MOCK_VAULT_GOLD_NG)
      : totalGoldLiabilityNg;

    console.log(`- Actual Bank Balance: ${actualBankBalanceRial.toString()} Rial`);
    console.log(`- Actual Vault Gold: ${actualVaultGoldNg.toString()} ng`);

    // 3. Reconcile
    console.log('\n📊 Reconciliation Results:');
    
    let status = 'BALANCED';
    
    const cashDiff = actualBankBalanceRial - totalCashLiabilityRial;
    const goldDiff = actualVaultGoldNg - totalGoldLiabilityNg;

    if (cashDiff === BigInt(0) && goldDiff === BigInt(0)) {
      status = 'BALANCED';
    } else if (cashDiff < BigInt(0) || goldDiff < BigInt(0)) {
      status = 'CRITICAL'; // We have less assets than liabilities! Insolvency risk.
    } else {
      status = 'WARNING'; // We have more assets than liabilities (untracked deposits, fees, etc.)
    }

    console.log(`STATUS: [${status}]`);
    console.log(`Cash Discrepancy: ${cashDiff.toString()} Rial`);
    console.log(`Gold Discrepancy: ${goldDiff.toString()} ng`);

    if (status === 'CRITICAL') {
      console.error('\n🚨 ALERT: System insolvency detected! Liabilities exceed Assets.');
      process.exit(1);
    } else if (status === 'WARNING') {
      console.warn('\n⚠️ WARNING: Assets exceed Liabilities. Verify unallocated funds or accrued fees.');
      process.exit(0);
    } else {
      console.log('\n✅ System is fully balanced.');
      process.exit(0);
    }

  } catch (err) {
    console.error('Reconciliation failed:', err);
    process.exit(1);
  }
}

runReconciliation();
