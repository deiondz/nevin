This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup

This template keeps database access behind a small application port so the
persistence adapter can be swapped without changing use-case code.

- MongoDB is wired to Better Auth through `src/composition/auth-database-container.ts`.
- MongoDB is also available through `src/application/ports/outbound/database-service.ts`.
- The active MongoDB adapter is wired in `src/composition/database-container.ts`.
- The Mongoose implementation lives in
  `src/infrastructure/database/mongo/mongo-database-service.ts`.
- The legacy Drizzle/Neon helper remains in `src/lib/db.ts`, but it only requires
  `DATABASE_URL` when that helper is imported.

Add these values to your local environment:

```bash
MONGODB_URI="mongodb://localhost:27017/default-template"
MONGODB_MAX_POOL_SIZE="10"
```

Use the composition root from server-only code:

```typescript
import { connectDatabase } from "@/composition/database-container"

await connectDatabase()
```

## TanStack Query Setup

TanStack Query is configured globally for the App Router:

- `src/lib/query-client.ts` creates a per-request server query client and a
  stable browser query client.
- `src/components/providers.tsx` mounts `QueryClientProvider`,
  `ReactQueryDevtools`, and the auth error toaster.
- Server components can prefetch with `getQueryClient()` and wrap hydrated
  client UI in `HydrationBoundary`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
