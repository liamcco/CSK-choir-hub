import { Hono } from 'hono';

import {
  addGroupToGroup,
  addUserToGroup,
  createGroup,
  deleteGroup,
  getGroups,
  removeGroupFromGroup,
  removeUserFromGroup,
  updateGroup,
} from '@/api/controllers/groupsController';
import { requireAdmin } from '@/api/middleware/requireAdmin';

const router = new Hono();

router.use('*', requireAdmin);

router.get('/', getGroups);
router.post('/', createGroup);
router.put('/:groupId', updateGroup);
router.delete('/:groupId', deleteGroup);
router.post('/:groupId/users', addUserToGroup);
router.delete('/:groupId/users/:userId', removeUserFromGroup);
router.post('/:groupId/children', addGroupToGroup);
router.delete('/:groupId/children/:childGroupId', removeGroupFromGroup);

export default router;
