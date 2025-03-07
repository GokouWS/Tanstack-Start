# SETUP

- Replace domain in app/convex/auth.config.ts
- Add env variables for VITE_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY from API Keys tab in clerk project dashboard

# TODO

## Functionality

- [ ] Decide on a set folder structure, mainly for api routes, db, server functions
- [x] Add auth (likely clerk)
- [x] Add DB/ORM (or branches multiple) added convex
- [ ] Add superjson
- [ ] Add seo
- [x] Add a protected route
- [ ] Add and configure vitest and react testing library
- [ ] Add and configure convex-test
- [x] Add a loader component
- [x] Add seperate nav component
- [ ] Add a global counter component
- [ ] Add a counter component that is stored in each user
- [x] Configure webhooks for storing clerk users in convex DB
- [ ] Add a theme toggle

## Issues

- [ ] Fix type errors in \_\_root.tsx from dark/light mode toggle (Look into new tailwind v4 themes)
- [x] Look into cause of hydration errors
- [x] Fix react-router has no HeadContent or Scripts imports
- [x] Update tailwind for v4
