import { Hono } from 'hono';

import { createSong, deleteSong, getSongById, getSongs } from '@/api/controllers/songsController';

import tagsRoutes from './tags';

const router = new Hono();

router.get('/', getSongs);
router.post('/', createSong);
router.get('/:songId', getSongById);
router.delete('/:songId', deleteSong);

router.route('/:songId/tags', tagsRoutes);

export default router;
