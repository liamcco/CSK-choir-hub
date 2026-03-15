import { Hono } from 'hono';

import {
  createEvent,
  deleteEvent,
  getEventDetail,
  getEvents,
  updateEvent,
} from '@/api/controllers/eventsController';

import attendanceRoutes from './attendance';
import registrationRoutes from './registrations';

const router = new Hono();

router.get('/', getEvents);
router.post('/', createEvent);

router.get('/:id', getEventDetail);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

router.route('/:id/attendances', attendanceRoutes);
router.route('/:id/registrations', registrationRoutes);

export default router;
