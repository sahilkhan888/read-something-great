# Read Something Great

A news discovery app where users browse articles by topic, authenticate via Google OAuth, and save bookmarks to a personal library.

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** — utility-first, with a custom "Brutal Design" theme (`src/app/globals.css`)
- **Supabase** — Postgres database + Auth (Google OAuth, cookie-based sessions via `@supabase/ssr`)
- **GNews API** — external news data source

## Project Structure

```
src/
  app/              # Next.js App Router: pages, layouts, API routes, auth handlers
  components/       # Reusable React components (client-side unless noted)
  lib/              # Shared utilities: types, GNews client, Supabase clients
middleware.ts       # Session refresh + /bookmarks auth guard
```

Key files:
- `src/lib/types.ts` — shared TypeScript interfaces (`Article`, `Bookmark`)
- `src/lib/gnews.ts` — GNews API wrapper with 1h cache
- `src/lib/supabase/client.ts` — browser Supabase client
- `src/lib/supabase/server.ts` — server Supabase client (SSR-safe)
- `src/app/globals.css` — design tokens and component classes (`.brutal-card`, `.brutal-button`, `.brutal-pill`)

## API Routes

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/articles?topic=[topic]` | Fetch articles from GNews |
| GET | `/api/bookmarks` | Get current user's bookmarks |
| POST | `/api/bookmarks` | Save an article |
| DELETE | `/api/bookmarks?article_url=[url]` | Remove a bookmark |
| POST | `/auth/login` | Redirect to Google OAuth |
| GET | `/auth/callback` | Exchange OAuth code for session |
| POST | `/auth/logout` | Clear session |

## Environment Variables

See `.env.example`. Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GNEWS_API_KEY` ← server-only, never prefix with `NEXT_PUBLIC_`
- `NEXT_PUBLIC_APP_URL` — used for OAuth redirect URIs

## Commands

```bash
npm run dev     # Development server (localhost:3000)
npm run build   # Production build
npm start       # Start production server
npm run lint    # ESLint
```

## Additional Documentation

Check these when working on related areas:

- `.claude/docs/architectural_patterns.md` — component boundaries (server vs client), auth flow, data fetching strategy, Supabase usage patterns, bookmark schema
