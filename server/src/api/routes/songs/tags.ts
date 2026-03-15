import { Hono } from 'hono';

import { assignTagToSong, removeTagFromSong } from '@/api/controllers/songsController';

const router = new Hono();

router.post('/', assignTagToSong);
router.delete('/', removeTagFromSong);

export default router;
