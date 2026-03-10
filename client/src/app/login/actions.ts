'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { loginUser } from '@/lib/api-client';
import { zLoginUserInput } from '@/lib/api-client/zod.gen';

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
  const validatedFields = zLoginUserInput.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;

  const response = await loginUser({ body: { username, password } });

  if (response.data === undefined) {
    const errorData = response.error;
    return {
      message: errorData.message || 'Login failed. Please try again.',
    };
  }
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

  redirect('/');
}
