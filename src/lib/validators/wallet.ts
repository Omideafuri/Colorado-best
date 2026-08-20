import { z } from 'zod';

export const depositSchema = z.object({
  amountToman: z
    .number()
    .int('مبلغ باید عدد صحیح باشد')
    .min(10_000, 'حداقل مبلغ واریز ۱۰,۰۰۰ تومان است')
    .max(500_000_000, 'حداکثر مبلغ واریز ۵۰۰,۰۰۰,۰۰۰ تومان است'),
  bankAccountId: z.string().min(1, 'حساب بانکی الزامی است'),
});

export const withdrawSchema = z.object({
  amountToman: z
    .number()
    .int('مبلغ باید عدد صحیح باشد')
    .min(50_000, 'حداقل مبلغ برداشت ۵۰,۰۰۰ تومان است')
    .max(100_000_000, 'حداکثر مبلغ برداشت ۱۰۰,۰۰۰,۰۰۰ تومان است'),
  bankAccountId: z.string().min(1, 'حساب بانکی الزامی است'),
});

export type DepositInput = z.infer<typeof depositSchema>;
export type WithdrawInput = z.infer<typeof withdrawSchema>;
