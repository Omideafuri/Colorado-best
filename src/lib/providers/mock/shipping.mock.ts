/**
 * MOCK Shipping Provider
 * Simulates physical gold delivery for development.
 * Replace with real courier API in production.
 *
 * MOCK_SHIPPING_PROVIDER=true
 */

import type {
  IShippingProvider,
  ShipmentParams,
  ShipmentResult,
  TrackingInfo,
} from '../interfaces/shipping';

export class MockShippingProvider implements IShippingProvider {
  async createShipment(params: ShipmentParams): Promise<ShipmentResult> {
    console.log(`[MOCK SHIPPING] Creating shipment to: ${params.address}, ${params.city}`);
    return {
      success: true,
      trackingCode: `ZRV-${Date.now().toString(36).toUpperCase()}`,
      shippingFee: 500_000, // 50,000 Toman
      insuranceFee: params.requireInsurance ? 200_000 : 0,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };
  }

  async getTrackingInfo(trackingCode: string): Promise<TrackingInfo> {
    console.log(`[MOCK SHIPPING] Tracking: ${trackingCode}`);
    return {
      trackingCode,
      status: 'IN_TRANSIT',
      lastUpdate: new Date(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      history: [
        {
          status: 'PICKED_UP',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          location: 'تهران',
          description: 'مرسوله از انبار تحویل گرفته شد',
        },
        {
          status: 'IN_TRANSIT',
          timestamp: new Date(),
          location: 'مرکز توزیع',
          description: 'مرسوله در حال ارسال به مقصد',
        },
      ],
    };
  }
}
