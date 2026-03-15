import { Hono } from 'hono';

import bookRoutes from './books';
import eventRoutes from './events';
import groupRoutes from './groups';
import healthRoute from './health';
import roleRoutes from './roles';
import songRoutes from './songs';
import tagRoutes from './tags';

const router = new Hono();

router.route('/books', bookRoutes);
router.route('/events', eventRoutes);
router.route('/groups', groupRoutes);
router.route('/roles', roleRoutes);
router.route('/songs', songRoutes);
router.route('/tags', tagRoutes);
router.route('/health', healthRoute);

export default router;
