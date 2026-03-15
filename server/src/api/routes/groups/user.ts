import { Hono } from 'hono';

import { addUserToGroup, removeUserFromGroup } from '@/api/controllers/groupsController';

const router = new Hono();

router.post('/', addUserToGroup);
router.delete('/:userId', removeUserFromGroup);

export default router;
