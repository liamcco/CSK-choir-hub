import { Router } from 'express';

import { health } from '@/api/controllers/healthController';

const router = Router();

router.get('/', health);

export default router;
