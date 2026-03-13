'use server';

import { redirect } from 'next/navigation';

import { zLoginUserInput } from '@/lib/api-client/zod.gen';
import { authClient } from '@/lib/auth-client';

export type FormState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string;
};

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

  const response = authClient.signIn.email({
    email: username,
    password,
  });

  redirect('/');
}
