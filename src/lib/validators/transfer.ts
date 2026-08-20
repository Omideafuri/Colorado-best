import { z } from 'zod';

export const goldTransferSchema = z.object({
  weightGrams: z
    .number()
    .positive('وزن باید بیشتر از صفر باشد'),
  transferMethod: z.enum(['MOBILE', 'USER_ID', 'QR_CODE']),
  recipientMobile: z
    .string()
    .regex(/^09\d{9}$/, 'شماره موبایل نامعتبر است')
    .optional(),
  recipientUserId: z.string().optional(),
  idempotencyKey: z.string().min(1, 'کلید یکتا الزامی است'),
}).refine(
  (data) => {
    if (data.transferMethod === 'MOBILE') return !!data.recipientMobile;
    if (data.transferMethod === 'USER_ID') return !!data.recipientUserId;
    return true;
  },
  {
    message: 'اطلاعات گیرنده الزامی است',
  }
);

export type GoldTransferInput = z.infer<typeof goldTransferSchema>;
