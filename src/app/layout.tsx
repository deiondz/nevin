import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";

import "@/styles/app.css";

import { Providers } from "@/components/providers";
import { ThemeProvider, ThemeScript } from "@/components/theme-provider";
import { getEnabledSocialProviderIds } from "@/lib/auth-social-providers";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: "Nevin",
	description: "A Next.js starter for auth-first product apps.",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const socialProviders = getEnabledSocialProviderIds();

	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn("font-sans", geist.variable)}
		>
			<head>
				<ThemeScript />
			</head>
			<body className="antialiased min-h-svh bg-muted flex flex-col">
				<div
					aria-hidden="true"
					className="absolute inset-0 -z-10 h-full w-full bg-muted bg-[linear-gradient(to_right,var(--auth-grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--auth-grid-line)_1px,transparent_1px)] bg-size-[6rem_4rem] [--auth-grid-line:color-mix(in_oklab,var(--muted-foreground)_7%,transparent)] dark:[--auth-grid-line:color-mix(in_oklab,var(--muted-foreground)_3%,transparent)]"
				/>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<Providers socialProviders={socialProviders}>{children}</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
