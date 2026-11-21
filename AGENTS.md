<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MentorLagbe

Single-package Next.js 16 (App Router) app — shadcn/ui + Tailwind v4. No monorepo, no tests, no CI.

## Commands

- `npm run dev` — dev server (also regenerates the block above; commit it)
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — flat-config ESLint
- `npm run format` — Prettier over `**/*.{ts,tsx}` only

Verification order: `format` → `lint` → `typecheck`. Baseline is currently red (as of last verified run): `typecheck` fails on `components/shared/Navbar.tsx` and `lint` reports 2 pre-existing errors in `components/ui/carousel.tsx` + `hooks/use-mobile.ts` (setState-in-effect). Don't assume failures are yours.

## Framework quirks

- **Next.js 16.4.6** — read `node_modules/next/dist/docs/` before writing Next code; do not trust training-data knowledge of Next APIs.
- **shadcn style `base-nova`** (see `components.json`): primitives are **Base UI** (`@base-ui/react`), not Radix. There is **no `asChild` prop** — compose via `render={<Element />}` instead (see `components/ui/sheet.tsx`). `asChild` fails typecheck.
- **`cn` is the `cn` npm package**, re-exported at `lib/utils.ts` — not clsx/tailwind-merge. Import from `@/lib/utils` (or `"cn"` directly, as `components/ui/*` does).
- **Tailwind v4, no config file** — everything lives in `app/globals.css` (`@import "tailwindcss"`, `@import "shadcn/tailwind.css"`). Add components with `npx shadcn@latest add <name>`.

## Conventions

- Prettier: **no semicolons**, double quotes, 80 cols, Tailwind class sorting (`prettier-plugin-tailwindcss`, stylesheet `app/globals.css`). Run `npm run format` before finishing.
- Path alias: `@/*` → repo root (`@/components/...`, `@/lib/...`, `@/hooks/...`).
- `components/ui/*` is shadcn-generated — prefer regenerating/patching over hand-rewriting; `components/shared/*`, `app/*`, `hooks/*`, `lib/*` are app code.
- `CLAUDE.md` just points at this file.
