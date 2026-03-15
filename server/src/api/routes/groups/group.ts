import { Hono } from 'hono';

import { addGroupToGroup, removeGroupFromGroup } from '@/api/controllers/groupsController';

const router = new Hono();

router.post('/', addGroupToGroup);
router.delete('/:subgroupId', removeGroupFromGroup);

export default router;
