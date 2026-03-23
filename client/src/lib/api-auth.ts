import { cookies } from 'next/headers';

export async function getApiRequestHeaders() {
  const cookieHeader = (await cookies()).toString();

  return cookieHeader
    ? {
        Cookie: cookieHeader,
      }
    : {};
}
