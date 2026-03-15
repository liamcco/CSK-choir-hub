import { Hono } from 'hono';

import { createBook, deleteBook, getBookWithId, getBooks } from '@/api/controllers/booksController';

import songsRouter from './songs';

const router = new Hono();

router.get('/', getBooks);
router.post('/', createBook);

router.get('/:bookId', getBookWithId);
router.delete('/:bookId', deleteBook);

router.route('/:bookId/songs', songsRouter);

export default router;
