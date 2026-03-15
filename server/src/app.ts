import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';

import routes from '@/api/routes';

import { auth } from './lib/auth';

const app = new Hono();

/* ---- Logging Middleware ---- */
app.use(logger());

/* ---- CORS configuration ---- */
app.use(
  '/api/*',
  cors({
    origin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);

/* ---- Authentication ---- */
app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw));

app.get('/', (c) => c.json({ message: 'Welcome to the CSK Choir Hub API!' }));

/* ---- Routes ---- */
app.route('/api', routes); // Main API routes

/* ---- Error Handling Middlewares ---- */
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }

  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;
