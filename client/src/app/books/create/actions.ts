'use server';

import { redirect } from 'next/navigation';

import { createBook } from '@/lib/api-client';
import { zCreateBookInput } from '@/lib/api-client/zod.gen';

export type FormState = {
  errors?: {
    title?: string[];
  };
  message?: string;
};

export async function createBookAction(
  _initialState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = zCreateBookInput.safeParse({
    title: formData.get('title')?.toString().trim(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (validatedFields.data.title.length === 0) {
    return {
      errors: {
        title: ['Title is required'],
      },
    };
  }

  const response = await createBook({ body: validatedFields.data });

  if (response.data === undefined) {
    const errorData = response.error;
    const errorMessage =
      typeof errorData === 'object' &&
      errorData !== null &&
      'message' in errorData &&
      typeof errorData.message === 'string'
        ? errorData.message
        : undefined;

    return {
      message: errorMessage || 'Could not create book. Please try again.',
    };
  }

  redirect('/books');
}
