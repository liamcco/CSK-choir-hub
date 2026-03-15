import { serve } from '@hono/node-server';
import dotenv from 'dotenv';

import { prisma } from '@/db';

import app from './app';

dotenv.config();

// Server port
const PORT = parseInt(process.env.PORT ?? '', 10) || 5050;

const server = serve({
  fetch: app.fetch,
  port: PORT,
});

// graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
