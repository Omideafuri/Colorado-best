/**
 * KYC Provider Interface
 * Handles identity verification and bank account validation.
 */

export interface KycVerification {
  valid: boolean;
  firstName?: string;
  lastName?: string;
  error?: string;
}

export interface BankVerification {
  valid: boolean;
  ownerName?: string;
  bankName?: string;
  error?: string;
}

export interface IKycProvider {
  verifyNationalId(nationalId: string): Promise<KycVerification>;
  verifyBankAccount(sheba: string, nationalId: string): Promise<BankVerification>;
}
