import { dash } from '@better-auth/infra';
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  baseURL: 'http://localhost:3000/',
  emailAndPassword: { enabled: true },
  plugins: [dash()],
});
