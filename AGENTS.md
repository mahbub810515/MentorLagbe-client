<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MentorLagbe

Single-package Next.js 16 (App Router) app — shadcn/ui + Tailwind v4, better-auth + MongoDB. No monorepo, no tests, no CI.

## Commands

- `npm run dev` — dev server (also regenerates the block above; commit it)
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — bare `eslint` (flat config); lint one area with `npx eslint <path>`
- `npm run format` — Prettier over `**/*.{ts,tsx}` only; CSS/MD/JSON are left alone

Verification order: `format` → `lint` → `typecheck`. Baseline as of last verified run: `typecheck` passes; `lint` exits 1 from 2 pre-existing errors — `components/ui/carousel.tsx` and `hooks/use-mobile.ts` (set-state-in-effect) — plus 3 unused-var warnings in `components/auth/*-form.tsx`. Don't assume failures are yours.

## Setup / env

No `.env.example`; `.env` / `.env.local` hold the values. Vars read by code: `MONGODB_URI` (required — `lib/mongodb.ts` throws at import if missing), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BETTER_AUTH_URL`, `IMGBB_API_KEY`.

## Architecture

- Root layout (`app/layout.tsx`) already renders `Navbar` and `Toaster` globally — don't re-add them per page.
- Auth: better-auth + Mongo adapter. Server config `lib/auth.ts`; client `lib/auth-client.ts` (`authClient`, `useSession`); catch-all route `app/api/auth/[...all]/route.ts`. User `role` (`student` | `tutor`) and `plan` (`free` | `pro`) are better-auth additional fields; session/role are read via `authClient.useSession()` (see `components/shared/Navbar.tsx`).
- Routes: `app/(auth)/sign-in|sign-up`, `app/dashboard/{admin,student,tutor}` (dashboards keyed by `role`), `app/tuitions` (browse).
- Image uploads POST to `app/api/upload/route.ts` (ImgBB). `next.config.ts` only whitelists the `i.ibb.co` host for `next/image` — add any other remote host there or the image 400s.

## Framework quirks

- **Next.js 16.4.6** — read `node_modules/next/dist/docs/` before writing Next code; do not trust training-data knowledge of Next APIs.
- **shadcn style `base-nova`** (see `components.json`): primitives are **Base UI** (`@base-ui/react`), not Radix. There is **no `asChild` prop** — compose via `render={<Element />}` instead (see `components/ui/sheet.tsx`). `asChild` fails typecheck.
- **`cn` is the `cn` npm package**, re-exported at `lib/utils.ts` — not clsx/tailwind-merge. Import from `@/lib/utils` (or `"cn"` directly, as `components/ui/*` does).
- **Tailwind v4, no config file** — everything lives in `app/globals.css` (`@import "tailwindcss"`, `@import "shadcn/tailwind.css"`). Add components with `npx shadcn@latest add <name>`. Theme tokens are neutral (no brand color); define new tokens/colors in `globals.css`.

## Conventions

- Prettier: **no semicolons**, double quotes, 80 cols, Tailwind class sorting (`prettier-plugin-tailwindcss`, stylesheet `app/globals.css`). Run `npm run format` before finishing.
- Path alias: `@/*` → repo root (`@/components/...`, `@/lib/...`, `@/hooks/...`).
- `components/ui/*` is shadcn-generated — prefer regenerating/patching over hand-rewriting; `components/{shared,auth,dashboard}/*`, `app/*`, `hooks/*`, `lib/*` are app code.
- `CLAUDE.md` just points at this file.
