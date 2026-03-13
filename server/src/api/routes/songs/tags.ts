import { Router } from 'express';

import { assignTagToSong, removeTagFromSong } from '@/api/controllers/songsController';
import { requireAuth } from '@/middleware/authMiddleware';

const router = Router();

router.post('/', requireAuth({ groups: ['Admins'] }), assignTagToSong);
router.delete('/', requireAuth({ groups: ['Admins'] }), removeTagFromSong);

export default router;
