// import { swaggerUI } from '@hono/swagger-ui';
import { betterAuthStudio } from 'better-auth-studio/hono';
import { Context, Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';

// import openApiDoc from '@/api/docs/openapi.bundle.json';
import routes from '@/api/routes';
import studioConfig from '@/lib/studio.config';

import { auth } from './lib/auth';

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

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
app.use('*', async (c: Context, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set('user', null);
    c.set('session', null);
    await next();
    return;
  }
  c.set('user', session.user);
  c.set('session', session.session);
  await next();
});

app.on(['POST', 'GET'], '/api/auth/*', (c: Context) => auth.handler(c.req.raw));

// Better Auth Studio routes
app.on(['POST', 'GET', 'PUT', 'DELETE'], '/api/studio/*', betterAuthStudio(studioConfig));

// Public route for testing
app.get('/', (c: Context) => c.json({ message: 'Welcome to the CSK Choir Hub API!' }));

// Serve the OpenAPI document
// app.get('/doc', (c: Context) => c.json(openApiDoc));

// Use the middleware to serve Swagger UI at /ui
// app.get('/ui', swaggerUI({ url: '/doc' }));

/* ---- Routes ---- */
app.route('/api', routes); // Main API routes

/* ---- Error Handling Middlewares ---- */
app.onError((err: unknown, c: Context) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }

  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;
