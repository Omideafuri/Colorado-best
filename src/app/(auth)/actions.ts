'use server';

import { db } from '@/lib/db';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { createSession, destroySession } from '@/lib/auth/session';
import { loginSchema, registerSchema } from '@/lib/validators/auth';
import { generateAndSendOtp, verifyOtp } from '@/lib/auth/otp';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  try {
    const mobile = formData.get('mobile') as string;
    const password = formData.get('password') as string;

    // Validate inputs
    const validatedData = loginSchema.safeParse({ mobile, password });
    
    if (!validatedData.success) {
      return { 
        success: false, 
        error: validatedData.error.issues[0]?.message || 'اطلاعات وارد شده نامعتبر است' 
      };
    }

    // Find user
    const user = await db.user.findUnique({
      where: { mobile: validatedData.data.mobile },
    });

    if (!user) {
      return { success: false, error: 'شماره موبایل یا رمز عبور اشتباه است' };
    }

    if (user.status !== 'ACTIVE') {
      return { success: false, error: 'حساب کاربری شما غیرفعال شده است' };
    }

    // Verify password
    const isValid = verifyPassword(validatedData.data.password, user.passwordHash);
    
    if (!isValid) {
      return { success: false, error: 'شماره موبایل یا رمز عبور اشتباه است' };
    }

    // Create session
    await createSession(user);

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'خطای سرور. لطفاً دوباره تلاش کنید.' };
  }
}

export async function registerAction(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    
    // Validate inputs
    const validatedData = registerSchema.safeParse(data);
    
    if (!validatedData.success) {
      return { 
        success: false, 
        error: validatedData.error.issues[0]?.message || 'اطلاعات وارد شده نامعتبر است' 
      };
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { mobile: validatedData.data.mobile },
    });

    if (existingUser) {
      return { success: false, error: 'این شماره موبایل قبلاً ثبت شده است' };
    }

    // Hash password
    const passwordHash = hashPassword(validatedData.data.password);

    // Create user and profile in a transaction
    const user = await db.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          mobile: validatedData.data.mobile,
          passwordHash,
          role: 'USER',
          status: 'ACTIVE',
        },
      });

      await tx.profile.create({
        data: {
          userId: newUser.id,
          firstName: validatedData.data.firstName,
          lastName: validatedData.data.lastName,
        },
      });

      // Create empty wallets
      await tx.cashWallet.create({
        data: { userId: newUser.id },
      });

      await tx.goldWallet.create({
        data: { userId: newUser.id },
      });

      return newUser;
    });

    // Create session
    await createSession(user);

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'خطای سرور. لطفاً دوباره تلاش کنید.' };
  }
}

export async function sendOtpAction(mobile: string, purpose: 'LOGIN' | 'REGISTER' | 'VERIFY' | 'RESET') {
  try {
    await generateAndSendOtp(mobile, purpose);
    return { success: true };
  } catch (error) {
    console.error('Send OTP error:', error);
    return { success: false, error: 'خطا در ارسال پیامک' };
  }
}

export async function verifyOtpAction(formData: FormData) {
  try {
    const mobile = formData.get('mobile') as string;
    const code = formData.get('code') as string;
    const purpose = formData.get('purpose') as 'LOGIN' | 'REGISTER' | 'VERIFY' | 'RESET';

    if (!mobile || !code || !purpose) {
      return { success: false, error: 'اطلاعات ناقص است' };
    }

    const result = await verifyOtp(mobile, code, purpose);
    if (!result.success) {
      return { success: false, error: result.error };
    }

    // In a real flow, you might create a session here if it's OTP login.
    // Since we just verified it, we return success so the client can redirect or update UI.
    return { success: true };
  } catch (error) {
    console.error('Verify OTP error:', error);
    return { success: false, error: 'خطای سرور' };
  }
}

export async function logoutAction() {
  await destroySession();
  redirect('/');
}

