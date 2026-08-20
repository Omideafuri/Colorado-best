import { z } from 'zod';

export const deliveryOrderSchema = z.object({
  productId: z.string().optional(),
  weightGrams: z
    .number()
    .positive('وزن باید بیشتر از صفر باشد'),
  deliveryAddress: z
    .string()
    .min(10, 'آدرس باید حداقل ۱۰ کاراکتر باشد')
    .max(500, 'آدرس نباید بیش از ۵۰۰ کاراکتر باشد'),
  city: z.string().min(2, 'شهر الزامی است'),
  province: z.string().min(2, 'استان الزامی است'),
  postalCode: z
    .string()
    .length(10, 'کد پستی باید ۱۰ رقم باشد')
    .regex(/^\d{10}$/),
  recipientName: z
    .string()
    .min(3, 'نام گیرنده الزامی است'),
  recipientMobile: z
    .string()
    .regex(/^09\d{9}$/, 'شماره موبایل نامعتبر است'),
  requireInsurance: z.boolean().default(true),
});

export type DeliveryOrderInput = z.infer<typeof deliveryOrderSchema>;
