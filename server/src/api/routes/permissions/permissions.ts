import { Hono } from 'hono';

import { requireAdmin } from '@/api/middleware/requireAdmin';
import {
  createPermission,
  deletePermission,
  getPermissions,
  grantUserPermission,
  revokeUserPermission,
  updatePermission,
} from '@/api/controllers/permissionsController';

const router = new Hono();

router.use('*', requireAdmin);

router.get('/', getPermissions);
router.post('/', createPermission);
router.put('/:permissionId', updatePermission);
router.delete('/:permissionId', deletePermission);
router.post('/:permissionId/users', grantUserPermission);
router.delete('/:permissionId/users/:userId', revokeUserPermission);

export default router;
