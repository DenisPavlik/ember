# Ember

A crypto-friendly creator support platform — think "Buy Me a Coffee," but supporters can pay in BTC, ETH, or LTC. Creators sign in with Google, claim a username, and share a public page where fans send tips with an optional message.

> Portfolio project. Payments are currently mocked (the Cryptomus webhook is wired up and signature-verified, but invoice creation is disabled so donations confirm instantly in development).

## Features

- **Google OAuth** sign-in via NextAuth.js with a MongoDB adapter
- **Public creator pages** at `/[username]` with avatar, cover image, bio, and a paginated list of supporters
- **Creator dashboard** at `/profile` with editable profile, image uploads, earnings stats, recent supporters, and a (mocked) payout button
- **Live username validation** — debounced availability check against a reserved-name list and existing users
- **Donation flow** with three preset tiers (1 / 3 / 5 coffees) plus a custom-amount input, message field, and crypto selector
- **S3 image uploads** for avatars and covers (type + size validated server-side)
- **Searchable creator directory** with a modal-based search and a paginated home carousel
- **Animated UX** throughout — page transitions, staggered hero entrance, accordion FAQ, donation list slide-ins (Framer Motion)
- **Branded 404 / error / loading states** per route
- **38 unit tests** covering Zod schemas and key form components (Vitest + React Testing Library)

## Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS, Framer Motion, FontAwesome, Pacifico via `next/font`
- **Data:** MongoDB + Mongoose
- **Auth:** NextAuth.js (Google provider)
- **Storage:** AWS S3
- **Validation:** Zod (shared schemas between server actions and API routes)
- **Payments:** Cryptomus webhook handler (signature-verified, currently dormant)
- **Testing:** Vitest, jsdom, React Testing Library
- **Notifications:** react-hot-toast

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `.env.local` in the project root:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
MY_AWS_ACCESS_KEY=
MY_AWS_SECRET_KEY=
AWS_BUCKET=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
CRYPTOMUS_MERCHANT_ID=
CRYPTOMUS_PAYMENT_API_KEY=
```

The Cryptomus keys are only needed for webhook signature verification; the actual invoice creation is disabled in development.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server on `localhost:3000` |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm lint` | ESLint via `next lint` |
| `pnpm test` | Vitest in watch mode |
| `pnpm test:run` | Vitest single run (CI) |
| `pnpm test:coverage` | Coverage report |

## Project Structure

```
src/
├── app/                    # Next.js App Router (routes, API handlers, error/loading boundaries)
│   ├── [username]/         # Public creator page (SSR, paginated)
│   ├── profile/            # Creator dashboard (auth)
│   ├── api/
│   │   ├── auth/           # NextAuth handler
│   │   ├── users/          # Paginated directory + username availability check
│   │   └── cryptomus-webhook/  # Payment confirmation (dormant)
│   └── about | faq | contact
├── actions/                # Server actions: donations, profile, S3 upload
├── components/             # UI components (forms, lists, animated transitions)
├── lib/                    # DB connection, auth options, Zod schemas, config, username rules
└── models/                 # Mongoose schemas (ProfileInfo, Donation)
```

## Notes

- Uploaded images are stored on a `public-read` S3 bucket — intentional for profile pictures.
- The Donation model was originally registered under a misspelled name; legacy records under the old collection name will not be found by the current code.
- Re-enabling real crypto payments requires uncommenting the Cryptomus invoice creation in `donationActions.ts` and switching the initial `paid` flag back to `false` until the webhook fires.
