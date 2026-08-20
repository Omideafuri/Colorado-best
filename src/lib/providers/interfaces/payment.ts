/**
 * Payment Provider Interface
 * Handles deposits and withdrawals through banking infrastructure.
 */

export interface DepositParams {
  userId: string;
  amountRial: bigint;
  bankAccountId: string;
  callbackUrl: string;
}

export interface PaymentResult {
  success: boolean;
  paymentRef: string;
  redirectUrl?: string;
  error?: string;
}

export interface PaymentVerification {
  verified: boolean;
  amountRial: bigint;
  paymentRef: string;
  error?: string;
}

export interface WithdrawalParams {
  userId: string;
  amountRial: bigint;
  sheba: string;
  recipientName: string;
}

export interface WithdrawalResult {
  success: boolean;
  paymentRef: string;
  estimatedArrival?: Date;
  error?: string;
}

export interface IPaymentProvider {
  initiateDeposit(params: DepositParams): Promise<PaymentResult>;
  verifyPayment(paymentRef: string): Promise<PaymentVerification>;
  initiateWithdrawal(params: WithdrawalParams): Promise<WithdrawalResult>;
}
