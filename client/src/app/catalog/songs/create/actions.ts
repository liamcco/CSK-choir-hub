'use server';

import { redirect } from 'next/navigation';

import { createSong } from '@/lib/api-client';
import { zCreateSongInput } from '@/lib/api-client/zod.gen';

export type FormState = {
  errors?: {
    title?: string[];
    startingTones?: string[];
  };
  message?: string;
};

export async function createSongAction(
  _initialState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = zCreateSongInput.safeParse({
    title: formData.get('title')?.toString().trim(),
    startingTones: formData.get('startingTones')?.toString().trim() || undefined,
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

  const response = await createSong({ body: validatedFields.data });

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
      message: errorMessage || 'Could not create song. Please try again.',
    };
  }

  redirect('/songs');
}
