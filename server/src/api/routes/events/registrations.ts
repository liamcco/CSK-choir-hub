import { Hono } from 'hono';

import { registerUserForEvent, unregisterUserFromEvent } from '@/api/controllers/eventsController';

const router = new Hono();

router.post('/', registerUserForEvent);
router.delete('/', unregisterUserFromEvent);

export default router;
