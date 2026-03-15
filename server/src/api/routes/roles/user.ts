import { Hono } from 'hono';

import { assignUserToRole, removeUserFromRole } from '@/api/controllers/rolesController';

const router = new Hono();

router.put('/', assignUserToRole);
router.delete('/', removeUserFromRole);

export default router;
