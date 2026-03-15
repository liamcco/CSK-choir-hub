import { dash } from '@better-auth/infra';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { organization } from 'better-auth/plugins';
import { admin } from 'better-auth/plugins';
import { openAPI } from 'better-auth/plugins';

// If your Prisma file is located elsewhere, you can change the path
import { prisma } from '@/db/prisma';

const BASE_URL = process.env.BETTER_AUTH_URL || 'http://localhost:5050/';

export const auth = betterAuth({
  appName: 'CSK Choir Hub',
  baseURL: BASE_URL,
  trustedOrigins: ['http://localhost:3000', 'https://csk-choir-hub.vercel.app'],
  emailAndPassword: { enabled: true, disableSignUp: true },
  plugins: [dash(), organization(), admin(), openAPI()],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
});
