import { viewPaths } from "@better-auth-ui/core";
import { notFound } from "next/navigation";

import { Auth } from "@/components/auth/auth";
import { magicLinkPlugin } from "@/lib/auth/magic-link-plugin";

const authViewPaths = {
	...viewPaths.auth,
	...magicLinkPlugin().viewPaths?.auth,
};

export default async function AuthPage({
	params,
}: {
	params: Promise<{
		path: string;
	}>;
}) {
	const { path } = await params;

	if (!Object.values(authViewPaths).includes(path)) {
		notFound();
	}

	return (
		<div className="flex flex-1 items-center justify-center bg-background bg-cover p-0 md:bg-muted md:p-6">
			<Auth path={path} />
		</div>
	);
}
