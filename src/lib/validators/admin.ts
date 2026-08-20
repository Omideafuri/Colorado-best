import { z } from 'zod';

export const priceConfigUpdateSchema = z.object({
  goldType: z.string().default('18K'),
  buySpreadBp: z
    .number()
    .int()
    .min(0, 'اسپرد نمیتواند منفی باشد')
    .max(1000, 'اسپرد نمیتواند بیش از ۱۰٪ باشد'),
  sellSpreadBp: z
    .number()
    .int()
    .min(0)
    .max(1000),
  feeBp: z
    .number()
    .int()
    .min(0)
    .max(500, 'کارمزد نمیتواند بیش از ۵٪ باشد'),
  minBuyToman: z.number().int().min(0),
  maxBuyToman: z.number().int().min(0),
  minSellGrams: z.number().min(0),
});

export const kycReviewSchema = z.object({
  applicationId: z.string(),
  decision: z.enum(['VERIFIED', 'REJECTED']),
  rejectionReason: z.string().optional(),
}).refine(
  (data) => {
    if (data.decision === 'REJECTED') return !!data.rejectionReason;
    return true;
  },
  {
    message: 'دلیل رد الزامی است',
    path: ['rejectionReason'],
  }
);

export const userStatusUpdateSchema = z.object({
  userId: z.string(),
  status: z.enum(['ACTIVE', 'SUSPENDED']),
  reason: z.string().min(3, 'دلیل تغییر وضعیت الزامی است'),
});

export type PriceConfigUpdateInput = z.infer<typeof priceConfigUpdateSchema>;
export type KycReviewInput = z.infer<typeof kycReviewSchema>;
export type UserStatusUpdateInput = z.infer<typeof userStatusUpdateSchema>;
