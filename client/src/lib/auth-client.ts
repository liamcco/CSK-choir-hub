import { createAuthClient } from "better-auth/react"
import { organizationClient, twoFactorClient, usernameClient, emailOTPClient } from "better-auth/client/plugins"
import { passkeyClient } from "@better-auth/passkey/client"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050",
    plugins: [usernameClient(), organizationClient(), twoFactorClient(), emailOTPClient(), passkeyClient()],
})