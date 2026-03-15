import { Hono } from 'hono';

import { health } from '@/api/controllers/healthController';

const router = new Hono();

router.get('/', health);

export default router;
