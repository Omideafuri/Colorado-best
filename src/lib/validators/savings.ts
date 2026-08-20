import { z } from 'zod';

export const savingsPlanSchema = z.object({
  name: z.string().max(100).optional(),
  frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']),
  amountToman: z
    .number()
    .int()
    .min(10_000, 'حداقل مبلغ هر خرید ۱۰,۰۰۰ تومان است'),
  maxBudgetToman: z
    .number()
    .int()
    .positive('سقف بودجه باید بیشتر از صفر باشد')
    .optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
});

export const savingsPlanUpdateSchema = z.object({
  status: z.enum(['ACTIVE', 'PAUSED', 'CANCELLED']).optional(),
  amountToman: z.number().int().min(10_000).optional(),
  endDate: z.string().datetime().optional(),
});

export type SavingsPlanInput = z.infer<typeof savingsPlanSchema>;
export type SavingsPlanUpdateInput = z.infer<typeof savingsPlanUpdateSchema>;
