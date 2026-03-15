import { Hono } from 'hono';

import {
  createGroup,
  deleteGroup,
  getGroups,
  updateGroup,
} from '@/api/controllers/groupsController';

import groupsRouter from './group';
import rolesRouter from './role';
import usersRouter from './user';

const router = new Hono();

router.get('/', getGroups);
router.post('/', createGroup);
router.put('/:groupId', updateGroup);
router.delete('/:groupId', deleteGroup);

router.route('/:groupId/groups', groupsRouter);
router.route('/:groupId/roles', rolesRouter);
router.route('/:groupId/users', usersRouter);

export default router;
