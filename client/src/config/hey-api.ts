import { CreateClientConfig } from '@/lib/api-client/client';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: process.env.API_BASE_URL,
});
