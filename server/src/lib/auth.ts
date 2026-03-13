import { dash } from '@better-auth/infra';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

// If your Prisma file is located elsewhere, you can change the path
import { prisma } from '@/db/prisma';

export const auth = betterAuth({
  baseURL: 'http://localhost:3000/',
  emailAndPassword: { enabled: true },
  plugins: [dash()],
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
});
