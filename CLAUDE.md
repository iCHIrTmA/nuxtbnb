# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Note: This project has minimal tooling - no linting, testing, or other development scripts are configured.

## Architecture Overview

This is a **rental property platform (Airbnb-like)** built with **Nuxt.js 2.18.1** that uses third-party services as the primary backend infrastructure.

### Key Technology Stack
- **Nuxt.js 2** (Vue 2 based) - Not Nuxt 3
- **Tailwind CSS** with custom configuration
- **Algolia** - Primary data store and search engine (replaces traditional database)
- **Google OAuth** - Authentication system
- **Google Maps API** - Location services
- **Cloudinary** - Image upload and management

### Custom Module Architecture

This project uses **custom Nuxt modules** instead of the standard `/api` directory pattern:

- `/modules/auth.js` - JWT authentication middleware for all `/api/*` routes
- `/modules/algolia/` - API endpoints for user, homes, and search functionality
- `/modules/cloudinary/` - Image upload signature API

Each module registers its own middleware and routes using Nuxt's `render:setupMiddleware` hook.

### Data Architecture

**Important**: This project uses **Algolia as the primary database** - there is no traditional SQL/NoSQL database.

- **Data storage**: Three Algolia indexes (`homes`, `reviews`, `users`)
- **Read operations**: Frontend uses `$dataApi` plugin
- **Write operations**: Backend modules interact with Algolia REST API
- **Search**: Built on Algolia's search capabilities with geospatial support

### Authentication Flow

1. **Google Sign-In** generates JWT token on client
2. Token stored in `idToken` cookie (1-hour expiration)
3. Server middleware validates JWT on all `/api/*` requests
4. User identity attached to `req.identity` for API use

### File Structure Patterns

```
pages/admin/     # Admin routes (forced to SPA mode)
plugins/         # dataApi.js, auth.client.js, maps.client.js
modules/         # Custom modules with API routes
store/auth.js    # Simple Vuex store for auth state
data/            # Static JSON data files
```

### Environment Configuration

Required environment variables (see nuxt.config.js):
- `GOOGLE_MAPS_API` - Google Maps API key
- `ALGOLIA_APP_ID` & `ALGOLIA_API_KEY` - Search configuration
- `ALGOLIA_API_CREATE_OBJECT_API_KEY` - Server-side Algolia write access
- `CLOUDINARY_API_KEY` & `CLOUDINARY_API_SECRET` - Image management

### Development Notes

- **No TypeScript** - JavaScript only
- **Admin routes** are client-side only (`mode: 'spa'`)
- **API protection** automatically applied to all `/api/*` routes via auth module
- **Component discovery** enabled - components auto-imported
- **CSS extraction** enabled for production builds
- Extensive **Tailwind customization** in `/tailwind.config.js`

### Common Development Tasks

When adding new features:
1. **Data operations**: Interact with Algolia indexes via modules/algolia
2. **Authentication**: Protected routes automatically inherit JWT validation
3. **Image uploads**: Use Cloudinary integration via modules/cloudinary
4. **New API routes**: Add to existing modules or create new module in `/modules/`
5. **Styling**: Use custom Tailwind classes defined in configuration

### Important Constraints

- Stick to **Nuxt 2** patterns (not Nuxt 3)
- All persistent data must go through **Algolia** (no other database)
- New API routes should follow the **custom module pattern**
- Authentication is **Google OAuth only** via JWT cookies