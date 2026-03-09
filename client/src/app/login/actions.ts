'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { z } from 'zod';

import { loginUser } from '@/lib/api-client';

const schema = z.object({
  username: z.string().trim().min(1, { error: 'Username is required.' }),
  password: z.string().trim().min(1, { error: 'Password is required.' }),
});

export type FormState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string;
};

const AUTH_TOKEN_COOKIE_NAME = 'token';
const isCrossSiteCookies = process.env.CROSS_SITE_COOKIES === 'true';
const isSecureCookie = process.env.NODE_ENV === 'production' || isCrossSiteCookies;
const crossSiteSameSite = isCrossSiteCookies ? 'none' : 'lax';

export async function signin(initialState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = schema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;

  try {
    const response = await loginUser({ body: { username, password } });
    const response_cookies = response.response.headers.getSetCookie();

    const tokenCookie = response_cookies.find((cookie) =>
      cookie.startsWith(`${AUTH_TOKEN_COOKIE_NAME}=`),
    );
    if (!tokenCookie) {
      throw new Error('Authentication token not found in response cookies.');
    }

    const token = tokenCookie.split(';')[0].split('=')[1];

    const cookieStore = await cookies();

    cookieStore.set({
      name: AUTH_TOKEN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isSecureCookie,
      sameSite: crossSiteSameSite,
      path: '/',
      maxAge: 24 * 60 * 60,
    });
  } catch (error) {
    const fallback = error instanceof Error ? error.message : 'An error occurred while logging in.';

    return {
      message: fallback,
    };
  }

  redirect('/');
}
