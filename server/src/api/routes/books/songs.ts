import { Router } from 'express';

import { addSongToBook, removeSongFromBook } from '@/api/controllers/booksController';
import { requireAuth } from '@/middleware/authMiddleware';

const router = Router();

router.post('/', requireAuth({ groups: ['Admins'] }), addSongToBook);
router.delete('/:id', requireAuth({ groups: ['Admins'] }), removeSongFromBook);

export default router;
