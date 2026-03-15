import { Hono } from 'hono';

import { addSongToBook, removeSongFromBook } from '@/api/controllers/booksController';

const router = new Hono();

router.post('/', addSongToBook);
router.delete('/:id', removeSongFromBook);

export default router;
