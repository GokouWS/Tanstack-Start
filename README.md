# SETUP

- Replace domain in app/convex/auth.config.ts
- Add env variables for VITE_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY from API Keys tab in clerk project dashboard

# TODO

## Functionality

- [ ] Decide on a set folder structure, mainly for api routes, db, server functions
- [x] Add auth (likely clerk)
- [x] Add DB/ORM (or branches multiple) added convex
- [ ] Add superjson? (likely not required with convex)
- [ ] Add seo
- [x] Add a protected route
- [x] Add and configure vitest and react testing library
- [ ] Add and configure convex-test
- [x] Add a loader component
- [x] Add seperate nav component
- [x] Add a global counter component
- [x] Add a counter component that is stored in each user (Profile page)
- [x] Configure webhooks for storing clerk users in convex DB
- [ ] Add a theme toggle
- [ ] Add vercel integration for hosting

## Issues

- [ ] Fix type errors in \_\_root.tsx from dark/light mode toggle (Look into new tailwind v4 themes)
- [x] Look into cause of hydration errors
- [x] Fix react-router has no HeadContent or Scripts imports
- [x] Update tailwind for v4
