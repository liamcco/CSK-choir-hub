import { Router } from 'express';

import { assignUserToRole, removeUserFromRole } from '@/api/controllers/rolesController';
import { requireAuth } from '@/middleware/authMiddleware';

const router = Router();

router.put('/', requireAuth({ groups: ['Admins'] }), assignUserToRole);
router.delete('/', requireAuth({ groups: ['Admins'] }), removeUserFromRole);

export default router;
