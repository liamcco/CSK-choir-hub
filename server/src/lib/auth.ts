import { dash } from '@better-auth/infra';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { organization } from 'better-auth/plugins';
import { admin } from 'better-auth/plugins';

// If your Prisma file is located elsewhere, you can change the path
import { prisma } from '@/db/prisma';

const BASE_URL = process.env.BETTER_AUTH_URL || 'http://localhost:5050/';

export const auth = betterAuth({
  baseURL: BASE_URL,
  emailAndPassword: { enabled: true },
  plugins: [dash(), organization(), admin()],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
});
