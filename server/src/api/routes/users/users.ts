import { Hono } from 'hono';

import { getUsers } from '@/api/controllers/usersController';
import { requireAdmin } from '@/api/middleware/requireAdmin';

const router = new Hono();

router.use('*', requireAdmin);

router.get('/', getUsers);

export default router;
