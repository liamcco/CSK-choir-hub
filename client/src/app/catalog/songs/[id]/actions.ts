'use server';

import { redirect } from 'next/navigation';

import { assignTagToSong } from '@/lib/api-client';

export type AssignTagFormState = {
  errors?: {
    tagId?: string[];
  };
  message?: string;
};

export async function assignTagToSongAction(
  songId: string,
  _initialState: AssignTagFormState,
  formData: FormData,
): Promise<AssignTagFormState> {
  const tagId = formData.get('tagId')?.toString().trim();

  if (!tagId) {
    return {
      errors: {
        tagId: ['Select a tag to add'],
      },
    };
  }

  const response = await assignTagToSong({
    path: { songId },
    body: { tagId },
  });

  if (response.error !== undefined) {
    const errorData = response.error;
    const errorMessage =
      typeof errorData === 'object' &&
      errorData !== null &&
      'message' in errorData &&
      typeof errorData.message === 'string'
        ? errorData.message
        : undefined;

    return {
      message: errorMessage || 'Could not assign tag. Please try again.',
    };
  }

  redirect(`/catalog/songs/${songId}`);
}
