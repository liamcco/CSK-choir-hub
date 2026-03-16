import { createAuthClient } from "better-auth/react"
import { organizationClient, twoFactorClient, usernameClient, emailOTPClient } from "better-auth/client/plugins"
import { passkeyClient } from "@better-auth/passkey/client"

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL || 'http://localhost:5050/api/auth';

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: BASE_URL,
    plugins: [usernameClient(), organizationClient(), twoFactorClient(), emailOTPClient(), passkeyClient()],
})