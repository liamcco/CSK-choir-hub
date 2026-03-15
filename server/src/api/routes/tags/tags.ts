import { Hono } from 'hono';

import { createTag, deleteTag, getTags } from '@/api/controllers/tagsController';

const router = new Hono();

router.get('/', getTags);
router.post('/', createTag);
router.delete('/:id', deleteTag);

export default router;
