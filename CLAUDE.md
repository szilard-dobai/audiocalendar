# Audiocalendar - Developer Documentation

**Last Updated:** January 2026

## Project Overview

Audiocalendar is a music tracking and analytics application that automatically logs Spotify listening history and provides insights into user listening habits. It integrates with both Spotify and Google Calendar to create a comprehensive music tracking experience.

### Key Features
- Automatic Spotify listening history tracking
- Weekly listening statistics and analytics
- Google Calendar integration for listening history
- Visual data representation with charts
- User authentication via Supabase

---

## Architecture

### Monorepo Structure

This project uses **pnpm workspaces** with **Turborepo** for build orchestration:

```
audiocalendar/
├── client/                      # Next.js 15 web application (App Router)
├── packages/
│   └── types/                   # Shared TypeScript types from Supabase schema
├── supabase/                    # Supabase backend (Edge Functions, migrations)
├── turbo.json                   # Turborepo build pipeline config
├── pnpm-workspace.yaml          # Workspace definitions
└── package.json                 # Root package with shared scripts
```

### Technology Stack

#### Frontend (`client/`)
- **Next.js 15.1.x** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.2+** - Type safety
- **Tailwind CSS 3.3+** - Utility-first CSS
- **TanStack Query v5** - Server state management
- **ECharts 5.4+** - Data visualization

#### Backend & Database
- **Supabase** - PostgreSQL database with real-time subscriptions
- **Supabase Auth** - Authentication system
- **Edge Functions** (Deno runtime):
  - `sync-songs` - Spotify listening history sync
  - `push-to-calendar` - Google Calendar push
  - `handle-new-notification` - Notification management
  - `notify-user-registered` - Registration notifications
  - `setup-google` - Google OAuth setup

#### External Integrations
- **Spotify Web API SDK 1.1.2** - Music data fetching
- **@react-oauth/google** - Google Calendar OAuth
- **Supabase Auth Helpers** - Next.js auth integration

#### Build Tools
- **Turborepo 2.x** - Monorepo task runner
- **pnpm 9.x** - Package manager
- **ESLint 9.x** - Linting (Flat Config)
- **Prettier 3.x** - Code formatting
- **Husky 9.x** - Git hooks

---

## Getting Started

### Prerequisites
- Node.js 18+ (project uses v24.10.0)
- pnpm 9.x
- Supabase CLI (for local development)
- Spotify Developer Account
- Google Cloud Console account (for Calendar API)

### Installation

```bash
# Clone the repository
git clone https://github.com/szilard-dobai/audiocalendar.git
cd audiocalendar

# Install dependencies
pnpm install
```

### Environment Setup

Create a `.env` file in the root directory with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Spotify
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Google
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

```bash
# Start all services (Supabase local + Next.js dev server)
pnpm dev

# Start only Next.js client
pnpm -F client dev

# Stop Supabase services
pnpm stop

# Generate types from Supabase schema
pnpm generate
```

### Build & Deploy

```bash
# Build all packages
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Format code
pnpm format
```

---

## Project Details

### Next.js App Structure

The client uses the **App Router** (Next.js 13+) with the following structure:

```
client/src/app/
├── (home)/                      # Home page route group
├── (components)/                # Shared components route group
├── account/                     # Protected account pages
│   ├── me/                      # User profile & stats
│   └── settings/                # User settings
├── auth/                        # Authentication pages
│   ├── login/
│   ├── register/
│   ├── forgot-password/
│   └── reset-password/
├── privacy-policy/              # Legal pages
├── api/                         # API routes
│   ├── auth/callback/           # Auth callback
│   ├── google-callback/         # Google OAuth callback
│   └── spotify-callback/        # Spotify OAuth callback
├── layout.tsx                   # Root layout
└── middleware.ts                # Auth middleware
```

### Key Patterns

#### Server/Client Components
- Uses `"use client"` directive for interactive components
- Server Components by default for better performance
- Auth state managed via Supabase Auth Helpers

#### Data Fetching
- **TanStack Query** for all data fetching
- Custom hooks pattern (17 custom hooks):
  - `useHistory` - Fetch listening history
  - `useUser` - Current user data
  - `useStats` - Weekly statistics
  - etc.
- 1-minute stale time, 2-week cache time

#### Authentication
- Middleware protects `/account/*` routes
- Session management via Supabase cookies
- Redirect to login for unauthenticated users

---

## Database Schema

The Supabase database includes tables for:
- `users` - User profiles
- `history` - Listening history entries
- `notifications` - User notifications
- `settings` - User preferences

Types are auto-generated to `packages/types/database.ts` via:
```bash
pnpm generate
```

---

## Edge Functions

All Edge Functions are located in `supabase/functions/` and run on Deno:

### sync-songs
Syncs Spotify listening history for a user. Runs on a schedule via cron.

### push-to-calendar
Pushes listening history entries to Google Calendar.

### handle-new-notification
Processes new user notifications (email, push, etc.).

### notify-user-registered
Sends welcome notifications to newly registered users.

### setup-google
Handles Google Calendar OAuth setup flow.

---

## Deployment

### Vercel (Frontend)
The Next.js app is deployed on Vercel:
- Production: `https://audiocalendar.app`
- Auto-deploys from `main` branch
- Environment variables configured in Vercel dashboard

### Supabase (Backend)
- Hosted Supabase project
- Edge Functions deployed via Supabase CLI
- Database migrations applied via CLI

---

## Git Workflow

### Pre-push Hooks
Husky runs on `pre-push`:
```bash
pnpm lint      # ESLint checks
pnpm typecheck # TypeScript type checking
```

### Commit Message Format
Use conventional commits:
```
feat: add new feature
fix: resolve bug
docs: update documentation
chore: update dependencies
refactor: code restructuring
```

---

## Recent Updates (January 2026)

### Major Version Upgrades
The project was recently updated from severely outdated dependencies to modern versions:

- **Next.js**: 13.4.19 → 15.1.x
- **React**: 18.2.0 → 19.x
- **ESLint**: 7.32.0/8.49.0 → 9.x (Flat Config)
- **TypeScript ESLint**: 5.62.0 → 8.x
- **TanStack Query**: 4.35.3 → 5.x
- **Turbo**: 1.10.12 → 2.x
- **Prettier**: 2.5.1 → 3.x
- **Husky**: 8.0.0 → 9.x
- **Supabase Auth Helpers**: 0.8.1 → 0.15.0

### Breaking Changes to Note
1. **Next.js 15**: New caching defaults, improved App Router
2. **React 19**: New compiler, updated hooks behavior
3. **ESLint 9**: Flat config format (replaces `.eslintrc`)
4. **TanStack Query v5**: API changes, new defaults

---

## Common Tasks

### Adding a New Page
1. Create file in `client/src/app/your-route/page.tsx`
2. Use TypeScript and proper types
3. Server Component by default, add `"use client"` if needed
4. Update sitemap config if public page

### Adding a New API Route
1. Create `client/src/app/api/your-route/route.ts`
2. Export `GET`, `POST`, etc. handlers
3. Use Next.js `NextRequest`/`NextResponse`
4. Handle auth via Supabase helpers

### Adding a New Edge Function
1. Create `supabase/functions/function-name/index.ts`
2. Use Deno syntax (not Node.js)
3. Test locally with `supabase functions serve`
4. Deploy with `supabase functions deploy function-name`

### Updating Database Schema
1. Create migration: `supabase migration new migration_name`
2. Edit SQL in `supabase/migrations/`
3. Apply locally: `supabase db reset`
4. Regenerate types: `pnpm generate`
5. Push to hosted: `supabase db push`

---

## Troubleshooting

### Build Errors After Updates
```bash
# Clear all caches and reinstall
rm -rf node_modules .next .turbo
pnpm install
pnpm build
```

### Type Errors
```bash
# Regenerate Supabase types
pnpm generate

# Check TypeScript errors
pnpm typecheck
```

### Supabase Connection Issues
```bash
# Check Supabase status
supabase status

# Restart Supabase
supabase stop
supabase start
```

### ESLint Configuration Issues (Flat Config)
If you see ESLint errors after the v9 upgrade:
- Check `eslint.config.mjs` (new flat config format)
- Old `.eslintrc.json` files are no longer used
- Update VSCode ESLint extension to latest version

---

## Performance Considerations

### Optimizations in Place
- Server Components for non-interactive UI
- TanStack Query caching (1min stale, 2wk cache)
- Next.js Image optimization for Spotify album art
- Edge Functions for serverless scalability
- Turborepo caching for builds

### Monitoring
- Vercel Analytics integration
- Supabase dashboard for DB metrics
- Edge Function logs in Supabase

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit using conventional commits
3. Ensure tests pass: `pnpm typecheck && pnpm lint`
4. Push and create a Pull Request
5. Wait for CI checks and review

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Google Calendar API](https://developers.google.com/calendar)

---

## License

MIT License - See [LICENSE](LICENSE) file for details.
