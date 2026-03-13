import { Router } from 'express';

import { updateUserAttendance } from '@/api/controllers/eventsController';

const router = Router({ mergeParams: true });

router.put('/', updateUserAttendance);

export default router;
