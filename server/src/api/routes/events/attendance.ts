import { Hono } from 'hono';

import { updateUserAttendance } from '@/api/controllers/eventsController';

const router = new Hono();

router.put('/', updateUserAttendance);

export default router;
