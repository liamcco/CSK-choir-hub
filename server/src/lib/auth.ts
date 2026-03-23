import { dash } from '@better-auth/infra';
import { passkey } from '@better-auth/passkey';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { emailOTP, twoFactor, username } from 'better-auth/plugins';
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
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24, // 1 day
    },
  },
  plugins: [
    dash(),
    username(),
    admin(),
    openAPI(),
    twoFactor(),
    passkey(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'sign-in') {
          // Send the OTP for sign in
        } else if (type === 'email-verification') {
          // Send the OTP for email verification
        } else {
          // Send the OTP for password reset
        }
      },
    }),
  ],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  experimental: {
    joins: true, // Enable database joins for better performance
  },
});
