import { cookies } from 'next/headers';

import { Auth, CreateClientConfig } from '@/lib/api-client/client';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: process.env.API_BASE_URL,
  auth: async (auth: Auth) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    return token;
  },
});
