import { Router } from 'express';

import { addUserToGroup, removeUserFromGroup } from '@/api/controllers/groupsController';
import { requireAuth } from '@/middleware';

const router = Router();

router.post('/', requireAuth({ groups: ['Admins'] }), addUserToGroup);
router.delete('/:userId', requireAuth({ groups: ['Admins'] }), removeUserFromGroup);

export default router;
