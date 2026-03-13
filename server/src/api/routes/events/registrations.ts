import { Router } from 'express';

import { registerUserForEvent, unregisterUserFromEvent } from '@/api/controllers/eventsController';

const router = Router({ mergeParams: true });

router.post('/', registerUserForEvent);
router.delete('/', unregisterUserFromEvent);

export default router;
