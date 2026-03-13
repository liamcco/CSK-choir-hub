import { Router } from 'express';

import { addRoleToGroup, removeRoleFromGroup } from '@/api/controllers/groupsController';
import { requireAuth } from '@/middleware';

const router = Router();

router.post('/', requireAuth({ groups: ['Admins'] }), addRoleToGroup);
router.delete('/:roleId', requireAuth({ groups: ['Admins'] }), removeRoleFromGroup);

export default router;
