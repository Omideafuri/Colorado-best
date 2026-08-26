/**
 * MOCK KYC Provider
 * Simulates identity verification for development.
 * Replace with real KYC service in production.
 *
 * MOCK_KYC_PROVIDER=true
 */

import type {
  IKycProvider,
  KycVerification,
  BankVerification,
} from '../interfaces/kyc';

export class MockKycProvider implements IKycProvider {
  async verifyNationalId(nationalId: string): Promise<KycVerification> {
    console.log(`[MOCK KYC] Verifying national ID: ${nationalId}`);
    // Simulate a successful verification
    return {
      valid: nationalId.length === 10,
      firstName: 'کاربر',
      lastName: 'آزمایشی',
      error: nationalId.length !== 10 ? 'کد ملی باید ۱۰ رقم باشد' : undefined,
    };
  }

  async verifyBankAccount(sheba: string): Promise<BankVerification> {
    console.log(`[MOCK KYC] Verifying Sheba: ${sheba}`);
    return {
      valid: sheba.startsWith('IR') && sheba.length === 26,
      ownerName: 'کاربر آزمایشی',
      bankName: 'بانک ملت',
      error:
        !sheba.startsWith('IR') || sheba.length !== 26
          ? 'شماره شبا نامعتبر است'
          : undefined,
    };
  }
}
