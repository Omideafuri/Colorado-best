import { z } from 'zod';

export const buyOrderSchema = z
  .object({
    goldType: z.string().default('18K'),
    inputMode: z.enum(['BY_AMOUNT', 'BY_WEIGHT']),
    amountToman: z
      .number()
      .positive('مبلغ باید بیشتر از صفر باشد')
      .optional(),
    weightGrams: z
      .number()
      .positive('وزن باید بیشتر از صفر باشد')
      .optional(),
    idempotencyKey: z.string().min(1, 'کلید یکتا الزامی است'),
  })
  .refine(
    (data) => {
      if (data.inputMode === 'BY_AMOUNT') return data.amountToman !== undefined;
      if (data.inputMode === 'BY_WEIGHT') return data.weightGrams !== undefined;
      return false;
    },
    {
      message: 'مبلغ یا وزن بر اساس نوع سفارش الزامی است',
    }
  );

export const sellOrderSchema = z.object({
  goldType: z.string().default('18K'),
  weightGrams: z
    .number()
    .positive('وزن باید بیشتر از صفر باشد'),
  idempotencyKey: z.string().min(1, 'کلید یکتا الزامی است'),
});

export type BuyOrderInput = z.infer<typeof buyOrderSchema>;
export type SellOrderInput = z.infer<typeof sellOrderSchema>;
