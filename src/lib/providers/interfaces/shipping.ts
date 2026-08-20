/**
 * Shipping Provider Interface
 * Handles physical gold delivery logistics.
 */

export interface ShipmentParams {
  recipientName: string;
  recipientMobile: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  weight: number; // in grams
  declaredValue: number; // in Toman
  requireInsurance: boolean;
}

export interface ShipmentResult {
  success: boolean;
  trackingCode: string;
  shippingFee: number;
  insuranceFee: number;
  estimatedDelivery?: Date;
  error?: string;
}

export interface TrackingInfo {
  trackingCode: string;
  status: 'PENDING' | 'PICKED_UP' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'RETURNED';
  lastUpdate: Date;
  estimatedDelivery?: Date;
  history: Array<{
    status: string;
    timestamp: Date;
    location?: string;
    description?: string;
  }>;
}

export interface IShippingProvider {
  createShipment(params: ShipmentParams): Promise<ShipmentResult>;
  getTrackingInfo(trackingCode: string): Promise<TrackingInfo>;
}
