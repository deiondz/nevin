import { betterAuth } from "better-auth";
import { multiSession } from "better-auth/plugins";

import env from "../../env.config";
import { getAuthDatabaseAdapter } from "../composition/auth-database-container";

export const auth = betterAuth({
	database: getAuthDatabaseAdapter(),
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
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		},
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
});
