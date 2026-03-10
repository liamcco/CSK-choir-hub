'use server';

import { redirect } from 'next/navigation';

import { createEvent } from '@/lib/api-client';
import { zCreateEventInput } from '@/lib/api-client/zod.gen';

export type FormState = {
  errors?: {
    name?: string[];
    type?: string[];
    description?: string[];
    dateStart?: string[];
    dateEnd?: string[];
    place?: string[];
    requiresAttendance?: string[];
    requiresRegistration?: string[];
  };
  message?: string;
};

function normalizeDateTime(value: FormDataEntryValue | null): string | undefined {
  if (typeof value !== 'string' || value.trim() === '') {
    return undefined;
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toISOString();
}

export async function createEventAction(
  _initialState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = zCreateEventInput.safeParse({
    name: formData.get('name'),
    type: formData.get('type'),
    description: formData.get('description')?.toString().trim() || undefined,
    dateStart: normalizeDateTime(formData.get('dateStart')),
    dateEnd: normalizeDateTime(formData.get('dateEnd')),
    place: formData.get('place')?.toString(),
    requiresAttendance: formData.get('requiresAttendance') === 'on',
    requiresRegistration: formData.get('requiresRegistration') === 'on',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await createEvent({ body: validatedFields.data });

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
      message: errorMessage || 'Could not create event. Please try again.',
    };
  }

  redirect('/events');
}
