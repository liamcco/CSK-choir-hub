import { Hono } from 'hono';

import {
  addPermissionToRole,
  assignUserToRole,
  createRole,
  deleteRole,
  getRoles,
  removePermissionFromRole,
  removeUserFromRole,
  updateRole,
} from '@/api/controllers/rolesController';
import { requireAdmin } from '@/api/middleware/requireAdmin';

const router = new Hono();

router.use('*', requireAdmin);

router.get('/', getRoles);
router.post('/', createRole);
router.put('/:roleId', updateRole);
router.delete('/:roleId', deleteRole);
router.post('/:roleId/users', assignUserToRole);
router.delete('/:roleId/users/:userId', removeUserFromRole);
router.post('/:roleId/permissions', addPermissionToRole);
router.delete('/:roleId/permissions/:permissionId', removePermissionFromRole);

export default router;
