import type { MiddlewareHandler } from 'hono';

import { auth } from '@/lib/auth';
import { ForbiddenError, UnauthorizedError } from '@/utils/errors';

type AdminEnv = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export const requireAdmin: MiddlewareHandler<AdminEnv> = async (c, next) => {
  const user = c.get('user');

  if (!user) {
    throw new UnauthorizedError('Authentication required');
  }

  if (user.role?.toLowerCase() !== 'admin') {
    throw new ForbiddenError('Admin access required');
  }

  await next();
};
