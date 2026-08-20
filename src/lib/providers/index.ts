/**
 * Provider Factory
 * Selects mock or real providers based on environment variables.
 * All external dependencies are abstracted behind these interfaces.
 */

import type { IGoldPriceProvider } from './interfaces/gold-price';
import type { IPaymentProvider } from './interfaces/payment';
import type { IKycProvider } from './interfaces/kyc';
import type { INotificationProvider } from './interfaces/notification';
import type { IShippingProvider } from './interfaces/shipping';

import { MockGoldPriceProvider } from './mock/gold-price.mock';
import { MockPaymentProvider } from './mock/payment.mock';
import { MockKycProvider } from './mock/kyc.mock';
import { MockNotificationProvider } from './mock/notification.mock';
import { MockShippingProvider } from './mock/shipping.mock';

// Singleton instances
let goldPriceProvider: IGoldPriceProvider | null = null;
let paymentProvider: IPaymentProvider | null = null;
let kycProvider: IKycProvider | null = null;
let notificationProvider: INotificationProvider | null = null;
let shippingProvider: IShippingProvider | null = null;

export function getGoldPriceProvider(): IGoldPriceProvider {
  if (!goldPriceProvider) {
    if (process.env.MOCK_GOLD_PRICE_PROVIDER === 'true') {
      goldPriceProvider = new MockGoldPriceProvider();
    } else {
      // Fallback to mock if real provider not implemented yet
      goldPriceProvider = new MockGoldPriceProvider();
    }
  }
  return goldPriceProvider;
}

export function getPaymentProvider(): IPaymentProvider {
  if (!paymentProvider) {
    if (process.env.MOCK_PAYMENT_PROVIDER === 'true') {
      paymentProvider = new MockPaymentProvider();
    } else {
      paymentProvider = new MockPaymentProvider();
    }
  }
  return paymentProvider;
}

export function getKycProvider(): IKycProvider {
  if (!kycProvider) {
    if (process.env.MOCK_KYC_PROVIDER === 'true') {
      kycProvider = new MockKycProvider();
    } else {
      kycProvider = new MockKycProvider();
    }
  }
  return kycProvider;
}

export function getNotificationProvider(): INotificationProvider {
  if (!notificationProvider) {
    if (process.env.MOCK_NOTIFICATION_PROVIDER === 'true') {
      notificationProvider = new MockNotificationProvider();
    } else {
      notificationProvider = new MockNotificationProvider();
    }
  }
  return notificationProvider;
}

export function getShippingProvider(): IShippingProvider {
  if (!shippingProvider) {
    if (process.env.MOCK_SHIPPING_PROVIDER === 'true') {
      shippingProvider = new MockShippingProvider();
    } else {
      shippingProvider = new MockShippingProvider();
    }
  }
  return shippingProvider;
}

// Re-export interfaces
export type { IGoldPriceProvider, PriceData, HistoricalPrice, TimeRange } from './interfaces/gold-price';
export type { IPaymentProvider, DepositParams, PaymentResult, PaymentVerification, WithdrawalParams, WithdrawalResult } from './interfaces/payment';
export type { IKycProvider, KycVerification, BankVerification } from './interfaces/kyc';
export type { INotificationProvider, PushPayload } from './interfaces/notification';
export type { IShippingProvider, ShipmentParams, ShipmentResult, TrackingInfo } from './interfaces/shipping';
