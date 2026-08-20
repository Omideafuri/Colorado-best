import { z } from 'zod';

// Iranian mobile number validation
const mobileRegex = /^09\d{9}$/;
const nationalIdRegex = /^\d{10}$/;
const shebaRegex = /^IR\d{24}$/;

export const loginSchema = z.object({
  mobile: z
    .string()
    .regex(mobileRegex, 'شماره موبایل نامعتبر است'),
  password: z
    .string()
    .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
});

export const registerSchema = z.object({
  mobile: z
    .string()
    .regex(mobileRegex, 'شماره موبایل نامعتبر است'),
  password: z
    .string()
    .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد')
    .max(128, 'رمز عبور نباید بیش از ۱۲۸ کاراکتر باشد'),
  confirmPassword: z.string(),
  firstName: z
    .string()
    .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
    .max(100, 'نام نباید بیش از ۱۰۰ کاراکتر باشد'),
  lastName: z
    .string()
    .min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد')
    .max(100, 'نام خانوادگی نباید بیش از ۱۰۰ کاراکتر باشد'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'رمز عبور و تکرار آن باید یکسان باشند',
  path: ['confirmPassword'],
});

export const otpSendSchema = z.object({
  mobile: z
    .string()
    .regex(mobileRegex, 'شماره موبایل نامعتبر است'),
  purpose: z.enum(['LOGIN', 'REGISTER', 'VERIFY', 'RESET']),
});

export const otpVerifySchema = z.object({
  mobile: z
    .string()
    .regex(mobileRegex, 'شماره موبایل نامعتبر است'),
  code: z
    .string()
    .length(6, 'کد تأیید باید ۶ رقم باشد')
    .regex(/^\d{6}$/, 'کد تأیید فقط شامل اعداد است'),
  purpose: z.enum(['LOGIN', 'REGISTER', 'VERIFY', 'RESET']),
});

export const profileUpdateSchema = z.object({
  firstName: z.string().min(2).max(100).optional(),
  lastName: z.string().min(2).max(100).optional(),
  nationalId: z
    .string()
    .regex(nationalIdRegex, 'کد ملی نامعتبر است')
    .optional(),
  email: z.string().email('ایمیل نامعتبر است').optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  province: z.string().max(100).optional(),
  postalCode: z
    .string()
    .length(10, 'کد پستی باید ۱۰ رقم باشد')
    .regex(/^\d{10}$/, 'کد پستی فقط شامل اعداد است')
    .optional(),
});

export const bankAccountSchema = z.object({
  bankName: z.string().min(2, 'نام بانک الزامی است'),
  accountNumber: z.string().optional(),
  cardNumber: z
    .string()
    .length(16, 'شماره کارت باید ۱۶ رقم باشد')
    .regex(/^\d{16}$/, 'شماره کارت فقط شامل اعداد است')
    .optional(),
  sheba: z
    .string()
    .regex(shebaRegex, 'شماره شبا نامعتبر است'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type OtpSendInput = z.infer<typeof otpSendSchema>;
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type BankAccountInput = z.infer<typeof bankAccountSchema>;
