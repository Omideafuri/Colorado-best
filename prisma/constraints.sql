-- Financial Constraints for Zaravi Gold

-- 1. CashWallet
ALTER TABLE "CashWallet" ADD CONSTRAINT check_cash_balance_positive CHECK ("balanceRial" >= 0);

-- 2. GoldWallet
ALTER TABLE "GoldWallet" ADD CONSTRAINT check_gold_balance_positive CHECK ("balanceNg" >= 0);

-- 3. LedgerEntry
ALTER TABLE "LedgerEntry" ADD CONSTRAINT check_ledger_amount_positive CHECK ("amount" >= 0);
ALTER TABLE "LedgerEntry" ADD CONSTRAINT check_ledger_balance_after_positive CHECK ("balanceAfter" >= 0);

-- 4. Order
ALTER TABLE "Order" ADD CONSTRAINT check_order_amounts_positive 
CHECK (
  ("requestedAmountRial" IS NULL OR "requestedAmountRial" >= 0) AND 
  ("requestedWeightNg" IS NULL OR "requestedWeightNg" >= 0) AND 
  ("executedAmountRial" IS NULL OR "executedAmountRial" >= 0) AND 
  ("executedWeightNg" IS NULL OR "executedWeightNg" >= 0) AND
  ("pricePerGramRial" >= 0) AND
  ("feeRial" >= 0)
);

-- 5. Trade
ALTER TABLE "Trade" ADD CONSTRAINT check_trade_amounts_positive 
CHECK (
  "weightNg" >= 0 AND 
  "pricePerGramRial" >= 0 AND 
  "totalRial" >= 0 AND 
  "feeRial" >= 0 AND 
  "netRial" >= 0
);

-- 6. Deposit
ALTER TABLE "Deposit" ADD CONSTRAINT check_deposit_amount_positive CHECK ("amountRial" > 0);

-- 7. Withdrawal
ALTER TABLE "Withdrawal" ADD CONSTRAINT check_withdrawal_amount_positive CHECK ("amountRial" > 0);

-- 8. GoldTransfer
ALTER TABLE "GoldTransfer" ADD CONSTRAINT check_transfer_weight_positive CHECK ("weightNg" > 0);
ALTER TABLE "GoldTransfer" ADD CONSTRAINT check_transfer_fee_positive CHECK ("feeRial" >= 0);

-- 9. SavingsPlan
ALTER TABLE "SavingsPlan" ADD CONSTRAINT check_savings_plan_amounts_positive 
CHECK (
  "amountRial" > 0 AND 
  ("maxBudgetRial" IS NULL OR "maxBudgetRial" >= 0) AND 
  "totalSpentRial" >= 0
);

-- 10. Product
ALTER TABLE "Product" ADD CONSTRAINT check_product_weight_positive CHECK ("weightNg" > 0);
ALTER TABLE "Product" ADD CONSTRAINT check_product_premium_positive CHECK ("premiumBp" >= 0);

-- 11. DeliveryOrder
ALTER TABLE "DeliveryOrder" ADD CONSTRAINT check_delivery_order_amounts_positive 
CHECK (
  "weightNg" > 0 AND 
  "shippingFeeRial" >= 0 AND 
  "insuranceFeeRial" >= 0
);
