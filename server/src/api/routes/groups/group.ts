import express from 'express';

import { addGroupToGroup, removeGroupFromGroup } from '@/api/controllers/groupsController';
import { requireAuth } from '@/middleware';

const router = express.Router();

router.post('/', requireAuth({ groups: ['Admins'] }), addGroupToGroup);
router.delete('/:groupId', requireAuth({ groups: ['Admins'] }), removeGroupFromGroup);

export default router;
