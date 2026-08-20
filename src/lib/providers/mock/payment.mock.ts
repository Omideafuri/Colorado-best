/**
 * MOCK Payment Provider
 * Simulates banking operations for development.
 * Replace with real payment gateway in production.
 *
 * MOCK_PAYMENT_PROVIDER=true
 */

import type {
  IPaymentProvider,
  DepositParams,
  PaymentResult,
  PaymentVerification,
  WithdrawalParams,
  WithdrawalResult,
} from '../interfaces/payment';

function generateRef(): string {
  return `MOCK-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export class MockPaymentProvider implements IPaymentProvider {
  async initiateDeposit(params: DepositParams): Promise<PaymentResult> {
    console.log(`[MOCK DEPOSIT] User: ${params.userId} | Amount: ${params.amountRial} Rial`);
    return {
      success: true,
      paymentRef: generateRef(),
      redirectUrl: `${params.callbackUrl}?ref=${generateRef()}&status=success`,
    };
  }

  async verifyPayment(paymentRef: string): Promise<PaymentVerification> {
    console.log(`[MOCK VERIFY] Ref: ${paymentRef}`);
    return {
      verified: true,
      amountRial: BigInt(10_000_000), // Default mock amount
      paymentRef,
    };
  }

  async initiateWithdrawal(params: WithdrawalParams): Promise<WithdrawalResult> {
    console.log(
      `[MOCK WITHDRAWAL] User: ${params.userId} | Amount: ${params.amountRial} Rial | Sheba: ${params.sheba}`
    );
    return {
      success: true,
      paymentRef: generateRef(),
      estimatedArrival: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
  }
}
