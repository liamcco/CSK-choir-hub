import { Hono } from 'hono';

import { addRoleToGroup, removeRoleFromGroup } from '@/api/controllers/groupsController';

const router = new Hono();

router.post('/', addRoleToGroup);
router.delete('/:roleId', removeRoleFromGroup);

export default router;
