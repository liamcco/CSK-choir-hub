import { type NextFunction, type Request, type Response } from 'express';

import { healthService } from '@/services';

export const health = async (req: Request, res: Response, next: NextFunction) => {
  const status = await healthService.checkHealth();

  return res.status(200).send({ status });
};
