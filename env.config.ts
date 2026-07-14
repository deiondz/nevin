import { defineEnv } from "envin";
import * as z from "zod";

const env = defineEnv({
	shared: {
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
	},
	server: {
		DATABASE_URL: z
			.string()
			.url()
			.refine(
				(url) =>
					url.startsWith("postgresql://") || url.startsWith("postgres://"),
				{
					message: "DATABASE_URL must be a PostgreSQL connection string",
				},
			)
			.optional(),
		MONGODB_URI: z
			.string()
			.url()
			.refine(
				(url) =>
					url.startsWith("mongodb://") || url.startsWith("mongodb+srv://"),
				{
					message: "MONGODB_URI must be a MongoDB connection string",
				},
			),
		MONGODB_MAX_POOL_SIZE: z.coerce
			.number()
			.int()
			.positive()
			.max(100)
			.default(10),
		BETTER_AUTH_SECRET: z.string().min(32),
		GITHUB_CLIENT_ID: z.string().min(1),
		GITHUB_CLIENT_SECRET: z.string().min(1),
		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),
	},
	clientPrefix: "NEXT_PUBLIC_",
	client: {},
	env: process.env,
	skip: process.env.SKIP_ENV_VALIDATION === "true",
	onError: (issues) => {
		console.error("Invalid environment variables:", issues);
		process.exit(1);
	},
	onInvalidAccess: (variable) => {
		throw new Error(
			`Attempted to access server variable "${variable}" on the client`,
		);
	},
});

export default env;
