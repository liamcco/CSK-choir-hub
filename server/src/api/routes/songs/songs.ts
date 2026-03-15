import { Hono } from 'hono';

import { createSong, deleteSong, getSongs } from '@/api/controllers/songsController';

import tagsRoutes from './tags';

const router = new Hono();

router.get('/', getSongs);
router.post('/', createSong);
router.delete('/:songId', deleteSong);

router.use('/songId/tags', tagsRoutes);

export default router;
