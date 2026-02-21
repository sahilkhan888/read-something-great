# Architectural Patterns

## Server vs. Client Component Split

Pages default to **server components**; only components requiring interactivity are marked `"use client"`.

**Server components** (no directive):
- `src/app/layout.tsx` — root layout, renders `Navbar`
- `src/app/page.tsx` — home page, fetches initial articles server-side
- `src/app/bookmarks/page.tsx` — fetches bookmarks server-side, passes as props

**Client components** (marked `"use client"`):
- `src/components/ArticleFeed.tsx` — owns topic state, triggers client-side refetch on topic change
- `src/components/BookmarkButton.tsx` — manages optimistic toggled state
- `src/components/RemoveBookmarkButton.tsx` — handles delete with local state update
- `src/components/AuthButton.tsx`, `TopicSelector.tsx`, `LoadingCard.tsx`

Pattern: server components fetch data and pass it as props to client components. Client components own only the state that changes after the initial render.

## Data Fetching Strategy

- **Initial page load**: server-side fetch (no loading state, no hydration mismatch)
- **Topic changes**: client-side `fetch('/api/articles?topic=...')` from `ArticleFeed` — `src/components/ArticleFeed.tsx`
- **GNews caching**: `next: { revalidate: 3600 }` on fetch calls — `src/lib/gnews.ts`
- **Bookmarks**: server-fetched on page load; mutations go through `/api/bookmarks` REST calls

## Dual Supabase Clients

Two separate Supabase client factories for different rendering contexts:

- `src/lib/supabase/client.ts` — `createBrowserClient()`, used in client components
- `src/lib/supabase/server.ts` — `createServerClient()` with cookie adapter, used in server components and API routes

API routes and server components always import from `server.ts`. Client components always import from `client.ts`. Never mix them.

## Authentication Flow

1. `POST /auth/login` → `signInWithOAuth({ provider: 'google', redirectTo: /auth/callback })`
2. Google redirects to `GET /auth/callback` → `exchangeCodeForSession(code)` → redirect to `/`
3. `POST /auth/logout` → `signOut()` → redirect to `/`
4. `middleware.ts` — runs on every non-static request: refreshes session via `supabase.auth.getUser()`, redirects unauthenticated requests to `/bookmarks` back to `/`

Session is cookie-based (managed by `@supabase/ssr`). No JWT handling needed in app code.

## API Route Pattern

All API routes (`src/app/api/*/route.ts`) follow the same structure:
1. Create server Supabase client
2. Call `supabase.auth.getUser()` — return 401 if unauthenticated
3. Execute query/mutation
4. Return `NextResponse.json(data)` or error response

No shared middleware for API auth — each route does its own `getUser()` check.

## Bookmark Schema (Supabase `bookmarks` table)

```
id                  uuid, primary key
user_id             uuid, FK → auth.users
article_url         text, unique per user
article_title       text
article_description text | null
article_image       text | null
article_source      text | null
article_published_at text | null
created_at          timestamptz
```

Articles are not stored independently — bookmark rows denormalize all display fields from GNews at save time.

## Design System Tokens

Defined as CSS custom properties in `src/app/globals.css`. Reusable component classes:
- `.brutal-card` — 3px solid border + box-shadow, hover lift
- `.brutal-button` — uppercase, bold, shadow, press animation
- `.brutal-pill` — small rounded badge

All text uses `Space Mono` (monospace). Color palette uses `--color-brutal-*` tokens (black, white, yellow, pink, blue, red, purple, orange).

## Import Path Alias

`@/*` maps to `src/*` (configured in `tsconfig.json`). All internal imports use this alias.
