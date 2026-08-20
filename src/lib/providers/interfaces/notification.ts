/**
 * Notification Provider Interface
 * Handles SMS, Email, and Push notifications.
 */

export interface PushPayload {
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface INotificationProvider {
  sendSms(mobile: string, message: string): Promise<void>;
  sendEmail(email: string, subject: string, body: string): Promise<void>;
  sendPush(userId: string, payload: PushPayload): Promise<void>;
}
