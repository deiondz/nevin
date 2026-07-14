import { betterAuth } from "better-auth";
import { multiSession } from "better-auth/plugins";

import env from "../../env.config";
import { getAuthDatabaseAdapter } from "../composition/auth-database-container";
import { getSocialProviders } from "./auth-social-providers";

export const auth = betterAuth({
	database: getAuthDatabaseAdapter(),
	...(env.BETTER_AUTH_URL ? { baseURL: env.BETTER_AUTH_URL } : {}),
	emailAndPassword: {
		enabled: true,
	},
	secret: env.BETTER_AUTH_SECRET,
	plugins: [multiSession()],
	user: {
		deleteUser: {
			enabled: true,
		},
	},
	socialProviders: getSocialProviders(),
});
