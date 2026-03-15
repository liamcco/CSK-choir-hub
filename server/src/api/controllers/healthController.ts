import { Context } from 'hono';

import { healthService } from '@/services';

export const health = async (c: Context) => {
  const status = await healthService.checkHealth();

  return c.json({ status });
};
