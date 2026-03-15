import { Hono } from 'hono';

import { createRole, deleteRole, getRoles } from '@/api/controllers/rolesController';

import roleUserRoutes from './user';

const router = new Hono();

router.get('/', getRoles);
router.post('/', createRole);
router.delete('/:roleId', deleteRole);

router.route('/:roleId/user', roleUserRoutes);

export default router;
