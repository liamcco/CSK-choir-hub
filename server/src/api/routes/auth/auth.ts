import { Router } from 'express';

import { authenticate, login, logout, register } from '@/api/controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/authenticate', authenticate);

export default router;
