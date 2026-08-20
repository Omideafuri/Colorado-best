/**
 * MOCK Notification Provider
 * Logs all notifications to console in development.
 * Replace with real SMS/Email/Push providers in production.
 *
 * MOCK_NOTIFICATION_PROVIDER=true
 */

import type {
  INotificationProvider,
  PushPayload,
} from '../interfaces/notification';

export class MockNotificationProvider implements INotificationProvider {
  async sendSms(mobile: string, message: string): Promise<void> {
    console.log(`[MOCK SMS] To: ${mobile} | Message: ${message}`);
  }

  async sendEmail(
    email: string,
    subject: string,
    body: string
  ): Promise<void> {
    console.log(`[MOCK EMAIL] To: ${email} | Subject: ${subject} | Body: ${body}`);
  }

  async sendPush(userId: string, payload: PushPayload): Promise<void> {
    console.log(`[MOCK PUSH] User: ${userId} | Title: ${payload.title} | Body: ${payload.body}`);
  }
}
