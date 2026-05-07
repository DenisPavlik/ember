# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Project name:** Ember (rebranded from "Buy Me a Coffee" — a portfolio project for crypto-friendly creator support).

## Commands

```bash
pnpm dev         # Start dev server on localhost:3000
pnpm build       # Production build
pnpm start       # Run production server
pnpm lint        # ESLint via next lint
pnpm test        # Vitest in watch mode
pnpm test:run    # Vitest single run (CI mode)
pnpm test:coverage # Coverage report (needs @vitest/coverage-v8)
pnpm add <pkg>   # Add a dependency
```

## Environment Variables

Required in `.env.local`:

```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
MONGODB_URI
MY_AWS_ACCESS_KEY
MY_AWS_SECRET_KEY
AWS_BUCKET
NEXTAUTH_URL              # http://localhost:3000 for dev
NEXTAUTH_SECRET
CRYPTOMUS_MERCHANT_ID     # webhook verification only — payments mocked
CRYPTOMUS_PAYMENT_API_KEY # webhook verification only — payments mocked
```

## Architecture

**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · MongoDB (Mongoose) · NextAuth.js (Google OAuth) · AWS S3 · Framer Motion · Zod · Vitest

### Routes

| Path | Type | Notes |
|------|------|-------|
| `/` | Static | Hero with floating creator cards (desktop) / scroll strip (mobile). Hero is a client component (`HeroContent`) with staggered Framer Motion entrance. |
| `/profile` | SSR (auth) | Creator dashboard: `<ProfileInfoForm>`, `<ProfileLinkCard>` (URL + copy), 3-tile stats grid (total earned / coffees / donations), `<PayoutButton>` (toast — Cryptomus dormant), and a Recent supporters block (last 5 via `<DonationList>`, "See all" links to public page). Falls back to `<NotLoggedin>` if no session. |
| `/[username]` | SSR + dynamic | Public creator page. Supports `?page=N` pagination on supporters list. Calls `notFound()` if username doesn't exist. |
| `/about`, `/faq`, `/contact` | Static | Branded content. FAQ content lives in `AccordionList.tsx`. |
| `/api/auth/[...nextauth]` | API | NextAuth handler. |
| `/api/users` | API | `GET ?page=N&limit=N` — returns paginated profile list (default 50). |
| `/api/users/check` | API | `GET ?username=xxx` — returns `{ available, reason? }`. Used by `<UsernameInput>` for debounced live validation. Validates format + reserved list + uniqueness (excludes current session's own username). |
| `/api/cryptomus-webhook` | API | POST endpoint for crypto payment confirmations (currently dormant — payments are mocked). |

Special files:
- `app/loading.tsx` (per route) — animated skeletons for `/profile` and `/[username]`
- `app/not-found.tsx` — global Ember-branded 404
- `app/error.tsx` — global client error boundary with reset button

### Data Layer

Two Mongoose models in `src/models/`:

- **ProfileInfo** — `{ email (unique), username (unique), displayName, bio, avatarUrl, coverUrl }` + `timestamps`
- **Donation** — `{ amount, name, email, message, crypto (btc|eth|ltc), paid }` + `timestamps`. Compound index on `{ email: 1, createdAt: -1 }` for paginated supporter lookups.

DB connection in `src/lib/db.ts`: global singleton in dev (HMR-safe), fresh connection per request in prod. Pages also call `mongoose.connect()` directly — Mongoose deduplicates the connection.

### Auth

`src/lib/authOptions.ts` — Google OAuth + MongoDB adapter. Server components use `getServerSession(authOptions)`. The `<NotLoggedin>` component handles the unauthenticated UI.

### Mutations (Server Actions)

`src/actions/`:
- `donationActions.createDonation()` — Zod-validates form data, creates Donation. **Currently hardcodes `paid: true`** (Cryptomus flow disabled).
- `profileInfoActions.saveProfile()` — Zod-validates, checks `RESERVED_USERNAMES`, then uniqueness, then upserts ProfileInfo for the session user.
- `uploadActions.uploadToS3()` — Validates file type (JPEG/PNG/WebP/GIF) and 5MB size limit, uploads to S3 with `public-read` ACL.

Zod schemas live in `src/lib/schemas.ts` (extracted because `"use server"` files can only export async functions). Username rules (regex, min/max, reserved set, `validateUsernameFormat()`) live in `src/lib/usernameRules.ts` — shared between the `/api/users/check` route and `saveProfile`.

### Constants

`src/lib/config.ts`:
- `COFFEE_PRICE` (5) — used by DonationForm and profile total calc
- `DONATIONS_PER_PAGE` (20) — `[username]` page pagination
- `USERS_PER_PAGE` (50) — `/api/users` default limit

### Image Handling

S3-hosted images are rendered via Next.js `<Image>` with `remotePatterns` configured in `next.config.mjs`. `<UploadButton>` calls `uploadToS3()` and stores the returned URL in form state. Cover images use `width=1200 height=192 sizes="100vw"`.

`<UploadButton>` props: `onUploadComplete(url)` is required; pass `onRemove` + `hasValue` to render a red "remove" button next to the pencil. Shows a spinner during upload, disables the file input while in flight, and emits `react-hot-toast` success/error messages. The hidden file input's `accept` attribute mirrors the server-side `ALLOWED_TYPES`.

### Forms with non-obvious UX

- **`<UsernameInput>`** (`ProfileInfoForm`) — controlled, auto-lowercases input, debounces 350 ms, calls `/api/users/check` with an `AbortController`. Shows inline status icon (spinner / green check / red x) and an error message. Calls `onValidityChange(valid)` so the parent can disable Save while username is invalid or being checked.
- **`<DonationForm>`** — three tier-cards (1/3/5 coffees) plus a custom amount input below an "or enter custom" divider. Custom input shows live `= $X total` preview when valid; out-of-range values keep the last valid `amount` and disable Submit (no silent clamp). Submit shows a spinner while the server action is in-flight. Crypto buttons use `faBitcoin` + `faEthereum` (brands) and `faLitecoinSign` (solid).
- **Bio textarea** in `ProfileInfoForm` is controlled with a `BIO_MAX = 500` limit (`maxLength` + char counter that turns red at the limit). Same counter pattern in DonationForm's `message` field.
- **`<NotLoggedin>`** — full sign-in card (mug icon, headline, "Continue with Google" button using `faGoogle` from brands, back-to-home link). Replaced the older one-line text.

### Animations (Framer Motion)

- `PageTransition` (in root layout) — fade + slide on every route change, keyed by `usePathname`
- `HeroContent` — staggered children variants
- `DonationList` — per-item slide-in with `delay: i * 0.08`
- `AccordionList` — `AnimatePresence` + `height: "auto"` (replaces CSS `max-h-96` hack)
- `DonationStatus` and `SearchButton` modal — `AnimatePresence` with scale + fade

### Testing

Vitest + jsdom + React Testing Library. Config: `vitest.config.ts`, setup: `vitest.setup.ts` (mocks `next/navigation` globally).

Tests co-located next to source as `*.test.tsx` / `*.test.ts`. **38 tests across 4 files** covering Zod schemas, DonationForm (incl. regressions for the 2/4 amount bug and the "out-of-range disables submit" behavior), AccordionList, DonationList. Component tests for ProfileInfoForm/SearchButton/UsernameInput and API route tests are intentionally not implemented (low ROI vs mocking cost). **Two AccordionList tests are currently failing** — pre-existing in the untracked test file, not yet diagnosed.

### Key Conventions

- FontAwesome icons (solid/regular/brands packages)
- `react-hot-toast` for toast notifications
- No global state manager — React hooks + server actions
- Pacifico font via `next/font/google` exposed as CSS variable

---

## Known Issues / Gotchas

- **Donation model migration debt** — the original schema was registered as `"Dotation"`. Now corrected to `"Donation"`, so any pre-existing production records under the old name won't be found. Run a one-time rename migration if real data exists.
- **Mocked payments** — `createDonation()` sets `paid: true` immediately. The Cryptomus webhook handler is in place and properly verifies signatures (md5 + `crypto.timingSafeEqual`), but `createDonation()` doesn't call out to Cryptomus to create an invoice. Re-enabling the real flow requires uncommenting the Cryptomus invoice creation and switching `paid` back to `false` until the webhook fires.
- **S3 bucket is `public-read`** — uploaded images are world-readable and enumerable. Intentional for profile images, but document if changing.
- **AWS S3 hostname** — bucket is named `denys-buymeacoffee` (legacy). Renaming the bucket is an out-of-code AWS operation; the hostname references in `next.config.mjs` and `uploadActions.ts` would need updating after a bucket migration.
